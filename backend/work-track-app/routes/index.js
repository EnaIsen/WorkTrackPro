var express = require("express");
var router = express.Router();
const { client } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async function (req, res, next) {
  const { ime, prezime, email, lozinka } = req.body;

  if (!ime || !prezime || !email || !lozinka) {
    res.send("Molim Vas unesite sva polja.");
    return;
  }

  if (lozinka.length < 6) {
    res.send("Lozinka bi trebala imati najmanje 6 karaktera.");
    return;
  }

  let hashedPassword = await bcrypt.hash(lozinka, 10);

  // Provjeri postoji li korisnik s istim emailom
  client.query(
    `SELECT * FROM workers
    WHERE worker_email = $1`,
    [email],
    async (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length > 0) {
        res.send("Već postoji korisnik!");
      } else {
        // Unesi novog korisnika
        client.query(
          `INSERT INTO workers (worker_name, worker_lastname, worker_email, worker_password) VALUES ($1, $2, $3, $4)`,
          [ime, prezime, email, hashedPassword],

          async (err, result) => {
            if (err) {
              console.log(err);

              throw err;
            }
            res.send({ poruka: "Uspješno", potvrda: true });
          }
        );
      }
    }
  );
});

router.post("/login", function (req, res, next) {
  const { email, lozinka } = req.body;

  if (!email || !lozinka) {
    res.send({ poruka: "Molim Vas unesite sva polja." });
    return;
  }

  client.query(
    `SELECT * FROM workers
    WHERE worker_email = $1`,
    [email],
    async (err, result) => {
      if (err) {
        throw err;
      }
      // Ako nije dobar email
      if (result.rows.length == 0) {
        return res.send({ poruka: "Nije uspješno" });
      }
      // Lozinka je dobra
      else {
        let lozinkaUBazi = result.rows[0].worker_password;
        if (bcrypt.compareSync(lozinka, lozinkaUBazi)) {
          // Ovdje spasavam korisnika
          const user = { email };
          const token = jwt.sign({ user }, "my_secret_key");
          console.log(result.rows[0]);

          console.log(token);
          return res.send({
            poruka: "Uspješno ste prijavljeni!",
            korisnik: result.rows[0],
            potvrda: true,
            token: token,
          });
        }
        // Lozinka nije dobra
        else {
          return res.send({ poruka: "Lozinka nije tačna!" });
        }
      }
    }
  );
});

router.get("/login/protected", ensureToken, function (req, res) {
  jwt.verify(req.token, "my_secret_key", function (err, data) {
    if (err) {
      throw err;
    } else {
      res.json({
        text: "Ovo je zaštićena ruta",
        data: data,
      });
    }
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.sendStatus(403);
  }
}

module.exports = router;
