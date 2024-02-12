var express = require("express");
var router = express.Router();
const { client } = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// ruta za dobavljanje svih projekata iz baze
router.get("/projects", function (req, res, next) {
  client.query("SELECT * FROM projects;", (err, result) => {
    if (err) {
      return res.send(err);
    }

    return res.send(result.rows);
  });
});

// ruta za ažuriranje postojećih projekta
router.put("/projects/edit", function (req, res, next) {
  const { p_name, p_details, p_start, p_end, p_status, id } = req.body;
  client.query(
    `UPDATE projects set project_name =$1, project_details = $2, project_start =$3, project_end = $4, project_status = $5 where id_project = $6 returning *`,
    [p_name, p_details, p_start, p_end, p_status, id],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      const updatedProject = result.rows[0];

      return res.send(updatedProject);
    }
  );
});

// ruta za dodavanje novih projekata
router.post("/projects/add", function (req, res, next) {
  const { p_name, p_details, p_start, p_end, p_status } = req.body;

  if (!p_name || !p_details || !p_start || !p_end || !p_status) {
    res.send("Molim Vas unesite sva polja.");
    return;
  }

  client.query(
    "INSERT INTO projects (project_name, project_details, project_start, project_end, project_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [p_name, p_details, p_start, p_end, p_status],
    async (err, result) => {
      if (err) {
        throw err;
      }

      const newProject = result.rows[0];

      res.send({
        newProject,
        porukaForm: "Uspješno ste dodali projekat",
        potvrdForm: true,
      });
    }
  );
});

// ruta za brisanje projekata iz baze sa određenim id-em
router.delete("/projects/delete/:id", function (req, res, next) {
  client.query(
    `DELETE FROM projects WHERE id_project = $1`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      return res.send(
        `Uspješno je izbrisali projekat sa id-em ${req.params.id}`
      );
    }
  );
});

// ruta za dobavljanje svih radnika iz baze
router.get("/workers", function (req, res, next) {
  client.query("SELECT * FROM workers;", (err, result) => {
    if (err) {
      return res.send(err);
    }

    console.log(result.rows);

    return res.send(result.rows);
  });
});

// ruta za brisanje radnika iz baze sa određenim id-em
router.delete("/workers/delete/:id", function (req, res, next) {
  client.query(
    `DELETE FROM workers WHERE id_worker = $1`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      return res.send(`Uspješno je izbrisan radnik sa id-em ${req.params.id}`);
    }
  );
});

// ruta za ažuriranje postojećih radnika
router.put("/workers/edit", function (req, res, next) {
  const { w_name, w_lastname, w_email, id } = req.body;
  client.query(
    `UPDATE workers set worker_name = $1, worker_lastname = $2, worker_email = $3 where id_worker = $4 returning *`,
    [w_name, w_lastname, w_email, id],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      const updatedWorker = result.rows[0];

      return res.send(updatedWorker);
    }
  );
});

// ruta za dodavanje novih radnika
router.post("/workers/add", function (req, res, next) {
  const { w_name, w_lastname, w_email } = req.body;

  if (!w_name || !w_lastname || !w_email) {
    res.send("Molim Vas unesite sva polja.");
    return;
  }

  const defaultPassword = w_name + w_lastname;
  console.log(defaultPassword, "sifra");

  client.query(
    `INSERT INTO workers (worker_name, worker_lastname, worker_email, worker_password) VALUES ($1, $2, $3, $4) returning *`,
    [w_name, w_lastname, w_email, defaultPassword],

    async (err, result) => {
      if (err) {
        throw err;
      }
      const newWorker = result.rows[0];

      res.send({
        newWorker,
        porukaWorker: "Uspješno ste dodali radnika",
        potvrdWorker: true,
      });
    }
  );
});

// ruta za dobijavnje svih zadataka
router.get("/tasks", function (req, res, next) {
  client.query(
    "SELECT id_task, task_name, task_details, task_status, project_name, projects.id_project FROM tasks INNER JOIN projects ON projects.id_project = tasks.id_project ;",
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      return res.send(result.rows);
    }
  );
});

// ruta za brisanje zadatka sa određenim id-em
router.delete("/tasks/delete/:id", function (req, res, next) {
  client.query(
    `DELETE FROM tasks WHERE id_task = $1`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      return res.send(`Uspješno je izbrisan zadatak sa id-em ${req.params.id}`);
    }
  );
});

// ruta za dodavanje novog zadatka
router.post("/tasks/add", function (req, res, next) {
  const { t_name, t_details, t_status, id } = req.body;

  if (!t_name || !t_details || !t_status || !id) {
    res.send("Molim Vas unesite sva polja.");
    return;
  }
  client.query(
    `INSERT INTO tasks (task_name, task_details, task_status, id_project) VALUES ($1, $2, $3, $4) returning *`,
    [t_name, t_details, t_status, id],

    async (err, result) => {
      if (err) {
        throw err;
      }
      const newTask = result.rows[0];

      client.query(
        `SELECT id_task, task_name, task_details, task_status, project_name, p.id_project from tasks inner join projects p on p.id_project = tasks.id_project where tasks.id_task = ${newTask.id_task}`,
        async (err, resultt) => {
          if (err) {
            throw err;
          }
          const newRes = resultt.rows[0];
          res.send({
            newTask: newRes,
            porukaTask: "Uspješno ste dodali zadatak",
            potvrdaTask: true,
          });
        }
      );
    }
  );
});

// ruta za ažuriranje postojećeg zadatka
router.put("/tasks/edit", function (req, res, next) {
  const { t_name, t_details, t_status, id } = req.body;
  client.query(
    `UPDATE tasks set task_name = $1, task_details = $2, task_status = $3 where id_task = $4 returning *`,
    [t_name, t_details, t_status, id],
    (err, result) => {
      if (err) {
        console.log(err, "err");
        return res.send(err);
      }
      const updatedTask1 = result.rows[0];

      client.query(
        `SELECT id_task, task_name, task_details, task_status, project_name, p.id_project from tasks inner join projects p on p.id_project = tasks.id_project where tasks.id_task = ${updatedTask1.id_task}`,
        async (err, resultt) => {
          if (err) {
            throw err;
          }
          const updatedTask = resultt.rows[0];
          return res.send(updatedTask);
        }
      );
    }
  );
});

// ruta za pregled svih radnika na projektima
router.get("/workersProjects", function (req, res, next) {
  client.query(
    "SELECT rp.id_rp, w.worker_name, w.worker_lastname, p.project_name, p.project_status FROM radnikprojekat rp INNER JOIN projects p ON rp.id_project = p.id_project INNER JOIN workers w ON rp.id_worker = w.id_worker;",
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      console.log(result.rows);
      return res.send(result.rows);
    }
  );
});

router.delete("/workersProjects/delete/:id", function (req, res, next) {
  client.query(
    `DELETE FROM radnikprojekat WHERE id_rp = $1`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      return res.send(
        `Uspješno je izbrisan radnik sa projekta sa id-em ${req.params.id}`
      );
    }
  );
});

// ruta za dodavanje radnika na projekte
router.post("/workersProjects/add", async function (req, res, next) {
  const { id_worker, id_project } = req.body;

  if (!id_worker || !id_project) {
    res.send("Molim Vas unesite sva polja.");
    return;
  }

  try {
    const projectResult = await client.query(
      `INSERT INTO radnikprojekat (id_project, id_worker) VALUES ($1,$2) returning *`,
      [id_project, id_worker]
    );

    const newWorkerProject = projectResult.rows[0];
    console.log(newWorkerProject, "novi radnik i projekat");

    client.query(
      `SELECT rp.id_rp, w.worker_name, w.worker_lastname, p.project_name, p.project_status FROM radnikprojekat rp INNER JOIN projects p ON rp.id_project = p.id_project INNER JOIN workers w ON rp.id_worker = w.id_worker WHERE p.id_project = ${newWorkerProject.id_project} AND w.id_worker = ${newWorkerProject.id_worker};`,
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }

        console.log(result.rows);
        res.send({
          newWorkerProject: result.rows[0],
          porukaWorkerProject: "Uspješno ste dodali radnika na projekat",
          potvrdaWorkerProject: true,
        });
      }
    );

    console.log(newWorkerProject, "prwr");
  } catch (error) {
    console.log("Nije dodan radnik na projekat: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// ruta za dohvaćanje radnih sati
router.get("/workHours", function (req, res, next) {
  const query = `
  SELECT
  h.id_hours,
  w.worker_name AS worker_name,
  p.project_name AS project_name,
  h.hours_worked,
  h.date_worked
FROM
  hours h
JOIN
  workers w ON h.id_worker = w.id_worker
JOIN
  projects p ON h.id_project = p.id_project;
    `;

  client.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    }

    return res.send(result.rows);
  });
});

// ruta za brisanje radnih sati sa određenim id-em
router.delete("/workHours/delete/:id", function (req, res, next) {
  client.query(
    `DELETE FROM hours WHERE id_hours = $1`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      return res.send(
        `Uspješno je izbrisan radni sat sa id-em ${req.params.id}`
      );
    }
  );
});

module.exports = router;
