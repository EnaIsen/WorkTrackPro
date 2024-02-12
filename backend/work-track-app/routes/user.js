var express = require("express");
var router = express.Router();
const { client } = require("../database");
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// ruta za uređivanje korisnikovog profila
router.put("/userProfile/edit", function (req, res, next) {
  const { worker_name, worker_lastname, worker_email, id_worker } = req.body;

  client.query(
    `UPDATE workers set worker_name = $1, worker_lastname = $2, worker_email = $3 where id_worker = $4 returning *`,
    [worker_name, worker_lastname, worker_email, id_worker],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      const updateUserProfile = result.rows[0];
      console.log(updateUserProfile, "dajKorisnika");

      return res.send(updateUserProfile);
    }
  );
});

// ruta za uređivanje korisnikove lozinke
router.put("/userProfile/editPassword", async function (req, res, next) {
  const { worker_password, id_worker } = req.body;

  let hashedPassword = await bcrypt.hash(worker_password, 10);

  client.query(
    "UPDATE workers set worker_password = $1 where id_worker = $2 returning *",
    [hashedPassword, id_worker],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      const updateUserPassword = result.rows[0];
      console.log(updateUserPassword, "dajLozinku");

      return res.send(updateUserPassword);
    }
  );
});

// ruta za pregled svih korisničkih projekata
router.get("/userProjects/all", function (req, res, next) {
  const id_worker = req.query.id_worker;
  client.query(
    "SELECT p.id_project, p.project_name, p.project_details, p.project_start, p.project_end, p.project_status FROM radnikprojekat rp INNER JOIN projects p ON rp.id_project = p.id_project INNER JOIN workers w ON rp.id_worker = w.id_worker WHERE w.id_worker = $1",
    [id_worker],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      return res.send(result.rows);
    }
  );
});

// tabela sa svim taskovima/ljudima/projektima - unos preko baze
router.get("/userTasks/all", function (req, res, next) {
  const id_worker = req.query.id_worker;
  console.log(id_worker, "id");
  client.query(
    "SELECT t.id_task, t.task_name, t.task_details, t.task_status, p.project_name FROM tableall ta INNER JOIN projects p ON ta.id_project = p.id_project INNER JOIN workers w ON ta.id_worker = w.id_worker INNER JOIN tasks t ON ta.id_task = t.id_task WHERE w.id_worker = $1",
    [id_worker],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      console.log(result.rows, "rows");
      return res.send(result.rows);
    }
  );
});

// ruta za dodavanje radnih sati
router.post("/userHours/add", async function (req, res, next) {
  const { id_worker, id_project, hours_worked, date_worked } = req.body;

  if (!id_worker || !id_project || !hours_worked || !date_worked) {
    res.send("Molim Vas unesite sva polja.");
    return;
  }

  try {
    const hoursResult = await client.query(
      `INSERT INTO hours (id_worker, id_project, hours_worked, date_worked) VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_worker, id_project, hours_worked, date_worked]
    );

    const newUserHours = hoursResult.rows[0];

    client.query(
      `SELECT h.id_hours, w.worker_name, p.project_name, h.hours_worked, h.date_worked FROM hours h INNER JOIN workers w ON h.id_worker = w.id_worker INNER JOIN projects p ON h.id_project = p.id_project WHERE p.id_project = ${newUserHours.id_project} AND w.id_worker = ${newUserHours.id_worker} AND h.id_hours = ${newUserHours.id_hours};`,
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.send({
          newUserHours: result.rows[0],
          porukaUserHours: "Uspješno ste dodali radne sate",
          potvrdaUserHours: true,
        });
      }
    );
  } catch (error) {
    console.log("Nije dodan radni sat: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// ruta za dobivanje svih radnih sati
router.get("/workHours", function (req, res, next) {
  const id_worker = req.query.id_worker;

  client.query(
    `SELECT h.id_hours, w.worker_name, p.project_name, h.hours_worked,h.date_worked FROM hours h JOIN workers w ON h.id_worker = w.id_worker JOIN projects p ON h.id_project = p.id_project WHERE w.id_worker = $1 order by h.id_hours;`,
    [id_worker],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      console.log(result.rows);
      return res.send(result.rows);
    }
  );
});

// ruta za dobivanje svih poruka
router.get("/userMessages/all", function (req, res, next) {
  const id_worker = req.query.id_worker;

  const query = `
    SELECT
      m.id_message,
      sender.worker_name AS sender_name,
      receiver.worker_name AS receiver_name,
      m.text_message
    FROM
      messages m
    JOIN
      workers sender ON m.id_send = sender.id_worker
    JOIN
      workers receiver ON m.id_receive = receiver.id_worker
    WHERE
      sender.id_worker = $1 OR receiver.id_worker = $1;
  `;

  client.query(query, [id_worker], (err, result) => {
    if (err) {
      return res.send(err);
    }

    return res.send(result.rows);
  });
});

module.exports = router;
