const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// database connect
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "autofy",
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/home", (req, res) => {
  dbConnection.query("SELECT * FROM data", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      // console.log(result);
    }
  });
});

app.listen(4000, () => {
  console.log("listening");
});
