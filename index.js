const express = require('express');
const pool = require('./db_config');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/api/students', async function (req, res) {
    let connection = await pool.getConnection();
    let sql = "SELECT * FROM students";
    let result = await connection.query(sql);
    connection.end();
    res.json(result);
});

app.get('/api/students/:id', async function (req, res) {
    let connection = await pool.getConnection();
    let sql = "SELECT * FROM students WHERE ID=" + req.params.id;
    let result = await connection.query(sql)
    connection.end();
    res.json(result);
});


app.post('/api/students', async function (req, res) {
    let connection = await pool.getConnection();
    let data = req.body;

    let sql = "INSERT INTO students(first_name, last_name, age, address, degree, grade) VALUES(?,?,?,?,?,?);"
    let values = [
        data['first_name'],
        data['last_name'],
        data['age'],
        data['address'],
        data['degree'],
        data['grade']
    ];
    let result = await connection.query(sql, values);
    connection.end();
    res.json("success");
});


app.listen(port);

console.log('listening on http://localhost:' + port);
