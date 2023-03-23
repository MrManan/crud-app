const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mani13114114",
  database: "crud",
});
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/product", (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const sql =
    "INSERT INTO productdetails (productName, productPrice) VALUES (?,?)";
  connection.query(sql, [productName, productPrice], (err, result) => {
    if (err) return res.status(500).end(err);
    res.send(result);
  });
});

app.get("/api/getData", (req, res) => {
  const sql = "SELECT * FROM productdetails";
  connection.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;

  connection.query(
    "UPDATE productdetails SET productName = ?, productPrice = ? WHERE id = ?",
    [productName, productPrice, id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM productdetails WHERE id=?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("*", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("Runing on port 3001");
});
