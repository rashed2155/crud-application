const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2155",
  database: "crud_database",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("database connected");
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const review = req.body.review;

  const sql = "insert into crud_database.movie(name,rating) values (?,?)";
  db.query(sql, [movieName, review], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("Values Inserted");
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
