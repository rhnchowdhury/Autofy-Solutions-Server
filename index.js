const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// database connection
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "autofy",
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// create blog data
app.post("/blog", (req, res) => {
  const { title, select, desc, status } = req.body;
  dbConnection.query(
    "INSERT into data (`title`,`type`,`content`, `status`) VALUES(?,?,?,?)",
    [title, select, desc, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// get all blog data
app.get("/blog", (req, res) => {
  dbConnection.query("SELECT * FROM data", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// get blog data by id
app.get("/blog/:id", (req, res) => {
  const { id } = req.params;
  dbConnection.query("SELECT * FROM data where id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(4000, () => {
  console.log("listening");
});
