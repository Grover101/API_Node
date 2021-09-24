const express = require("express");
const aplicacion = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

var pool = mysql.createPool({
  connectionLimit: 20,
  host: "localhost",
  user: "root",
  password: "",
  database: "blog_viaje",
});

aplicacion.use(bodyParser.json());
aplicacion.use(bodyParser.urlencoded({ extended: true }));

// Mostrar Publicaciones y busqueda de plublicaciones
aplicacion.get("/api/v1/publicaciones", function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    let consultaBusqueda = "";
    const busqueda = peticion.query.busqueda ? peticion.query.busqueda : "";
    if (busqueda != "") {
      consultaBusqueda = `WHERE 
        titulo LIKE '%${busqueda}%' OR
        resumen LIKE '%${busqueda}%' OR
        contenido LIKE '%${busqueda}%'`;
    }
    const query = `SELECT * FROM publicaciones ${consultaBusqueda}`;
    connection.query(query, function (error, filas, campos) {
      respuesta.json({ data: filas });
    });
    connection.release();
  });
});

// Mostrar Publicacion por id
aplicacion.get("/api/v1/publicaciones/:id", function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const query = `SELECT * FROM publicaciones WHERE id=${connection.escape(
      peticion.params.id
    )}`;
    connection.query(query, function (error, filas, campos) {
      if (filas.length > 0) {
        respuesta.json({ data: filas[0] });
      } else {
        respuesta.status(404);
        respuesta.send({ errors: ["No se encuentra esa publicacion"] });
      }
    });
    connection.release();
  });
});

// Mostrar Autores
aplicacion.get("/api/v1/autores", function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    let consultaBusqueda = "";
    const query = `SELECT * FROM autores`;
    connection.query(query, function (error, filas, campos) {
      respuesta.json({ data: filas });
    });
    connection.release();
  });
});

// Mostrar Autores por id
aplicacion.get("/api/v1/autores/:id", function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const query = `SELECT * FROM autores WHERE id=${peticion.params.id}`;
    connection.query(query, function (error, filas, campos) {
      if (filas.length > 0) {
        const query2 = `SELECT publicaciones.id id, titulo, resumen, contenido, foto, votos, fecha_hora FROM autores INNER JOIN publicaciones ON autores.id = publicaciones.autor_id WHERE autores.id=${peticion.params.id}`;
        connection.query(query2, function (error, filas2, campos2) {
          autores = [];
          ultimoAutorId = undefined;
          filas.forEach((autor) => {
            if (autor.id != ultimoAutorId) {
              ultimoAutorId = autor.id;
              autores.push({
                id: autor.id,
                email: autor.email,
                password: autor.contrasena,
                pseudonimo: autor.pseudonimo,
                avatar: autor.avatar,
                publicaciones:
                  filas2.length > 0 ? filas2 : "No tiene publicaciones",
              });
            }
          });
          respuesta.json({ data: autores });
        });
      } else {
        respuesta.status(404);
        respuesta.send({ errors: ["No se encuentra ese autor"] });
      }
    });
    connection.release();
  });
});

// Crear un usuario
aplicacion.post("/api/v1/autores", function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const email = peticion.body.email.trim();
    const pseudonimo = peticion.body.pseudonimo.trim();
    const contrasena = peticion.body.contrasena;
    const consultaEmail = `Select * FROM autores WHERE email=${connection.escape(
      email
    )}`;
    connection.query(consultaEmail, function (error, filas, campos) {
      if (filas.length > 0) {
        respuesta.status(404);
        respuesta.send({ errors: ["Email ya existe"] });
      } else {
        const consultaPseudonimo = `SELECT * FROM autores WHERE pseudonimo=${connection.escape(
          pseudonimo
        )}`;
        connection.query(consultaPseudonimo, function (error, filas, campos) {
          if (filas.length > 0) {
            respuesta.status(404);
            respuesta.send({ errors: ["Pseudonimo ya existe"] });
          } else {
            const consulta = `INSERT INTO 
                autores (email, contrasena, pseudonimo)
                VALUES (
                ${connection.escape(email)},
                ${connection.escape(contrasena)},
                ${connection.escape(pseudonimo)}
                )`;
            connection.query(consulta, function (error, filas, campos) {
              const newId = filas.insertId;
              const queryConsulta = `SELECT * FROM autores WHERE id=${connection.escape(
                newId
              )}`;
              connection.query(queryConsulta, function (error, filas, campos) {
                respuesta.status(201);
                respuesta.json({ data: filas[0] });
              });
            });
          }
        });
      }
    });
    connection.release();
  });
});

// Crear publicaciones
aplicacion.post("/api/v1/publicaciones", function (peticion, respuesta) {
  console.log(peticion.query);
  pool.getConnection(function (err, connection) {
    const query = `SELECT * FROM autores
    WHERE email=${connection.escape(peticion.query.email)}
    AND contrasena=${connection.escape(peticion.query.contrasena)} `;

    connection.query(query, function (error, filas, campos) {
      if (filas.length > 0) {
        const idAutor = filas[0].id;
        const date = new Date();
        const fecha = `${date.getFullYear()}-${date.getMonth() + 1
          }-${date.getDate()}`;

        const consulta = `
          INSERT INTO
          publicaciones
          (titulo, resumen, contenido, fecha_hora, autor_id)
          VALUES
          (
            ${connection.escape(peticion.body.titulo)},
            ${connection.escape(peticion.body.resumen)},
            ${connection.escape(peticion.body.contenido)},
            '${fecha}',
            '${idAutor}'
          )`;

        connection.query(consulta, function (error, filas, campos) {
          const newId = filas.insertId;
          const queryConsulta = `SELECT * FROM publicaciones WHERE id=${connection.escape(
            newId
          )}`;
          connection.query(queryConsulta, function (error, filas, campos) {
            respuesta.status(201);
            respuesta.json({ data: filas[0] });
          });
        });
      } else {
        respuesta.status(404);
        respuesta.send({ errors: ["Contrasena o email invalido"] });
      }
    });
    connection.release();
  });
});

// Eliminar Publicacion
aplicacion.delete("/api/v1/publicaciones/:id", function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const query = `SELECT * FROM autores
    WHERE email=${connection.escape(peticion.query.email)}
    AND contrasena=${connection.escape(peticion.query.contrasena)} `;
    connection.query(query, function (error, filas, campos) {
      if (filas.length > 0) {
        const query = `SELECT * FROM publicaciones WHERE id=${peticion.params.id} AND autor_id=${filas[0].id}`;
        connection.query(query, function (error, filas, campos) {
          if (filas.length > 0) {
            const queryDelete = `DELETE FROM publicaciones WHERE id='${peticion.params.id}'`;
            connection.query(queryDelete, function (error, filas, campos) {
              respuesta.status(204);
              respuesta.json();
            });
          } else {
            respuesta.status(404);
            respuesta.send({
              errors: ["Publicacion no pertenece a este usuario"],
            });
          }
        });
      } else {
        respuesta.status(404);
        respuesta.send({ errors: ["Contrasena o email invalido"] });
      }
    });
    connection.release();
  });
});

aplicacion.listen(8080, function () {
  console.log("Servidor iniciado");
});
