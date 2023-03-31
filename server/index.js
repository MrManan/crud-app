const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mani13114114",
  database: "crud",
});

// Some requires things

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Post data

app.post("/product", (req, res) => {
  const { name, price, categoryid } = req.body;
  const sql = "INSERT INTO product (name, price,categoryid) VALUES (?, ?,?)";
  connection.query(sql, [name, price, +categoryid], (err, result) => {
    if (err) {
      return res.status(500).end(err);
    }
    console.warn(result);
    return res.send(result);
  });
});

// Fetch data

app.get("/api/getData", (req, res) => {
  const sql = "SELECT * FROM product";
  connection.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Update data

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE product SET productName = ?, productPrice = ? WHERE id = ?";
  const values = [req.body.productName, req.body.productPrice];
  const id = req.params.id;
  connection.query(sql, [...values, id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Delete Data

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM product WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Get data to display in update input

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM product WHERE id=?";

  connection.query({ sql, values: [id] }, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results[0]);
  });
});

//Get category

app.get("/api/getCategory", (req, res) => {
  const sql = "SELECT * FROM category";
  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  });
});

// Get response

app.get("*", (req, res) => {
  res.send("Running on port 3001");
});

// Server

app.listen(3001, () => {
  console.log("Runing on port 3001");
});
