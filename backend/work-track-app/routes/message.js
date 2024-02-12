var express = require("express");
var router = express.Router();
const { client } = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// ruta za pregled svih poruka
router.get("/allMessages", function (req, res, next) {
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
        workers receiver ON m.id_receive = receiver.id_worker;
    `;

  client.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    }

    return res.send(result.rows);
  });
});

// ruta za brisanje poruka sa određenim id-em
router.delete("/messages/delete/:id", function (req, res, next) {
  client.query(
    `DELETE FROM messages WHERE id_message = $1`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      return res.send(`Uspješno je izbrisana poruka sa id-em ${req.params.id}`);
    }
  );
});

module.exports = router;
