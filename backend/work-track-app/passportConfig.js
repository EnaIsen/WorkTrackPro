const LocalStrategy = require("passport-local").Strategy;
const { authenticate } = require("passport");
const { client } = require("./database");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    client.query(
      `SELECT * FROM workers WHERE worker_email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const workers = results.rows[0];

          bcrypt.compare(password, workers.password, (err, isMatch) => {
            if (err) {
              throw err;
            }

            if (isMatch) {
              return done(null, workers);
            } else {
              return done(null, false, { message: "Lozinka nije tačna." });
            }
          });
        } else {
          return done(null, false, { message: "Email nije registrovan" });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    client.query(
      `SELECT * FROM workers WHERE id_worker = $1`,
      [id_worker],
      (err, results) => {
        if (err) {
          throw err;
        }
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;
