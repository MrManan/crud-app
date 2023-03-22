const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/product", (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const sql =
    "INSERT INTO productdetails (productName, productPrice) VALUES (?,?)";
  db.query(sql, [productName, productPrice], (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Runing on port 3001");
});
