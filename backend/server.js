const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const log = console.log;

const PORT = 5000;

const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
    id AUTOINCREMENT,
    value TEXT,
    PRIMARY KEY (ID)
)`, (err, results, fields)=>{
    log('results', results);
})

app.get('/api/values', (req, res) => {
    db.pool.query('SELECT * FROM lists;', 
    (err, results, fields)=>{
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success: true, value: results});
    });
});

app.post('/api/value', (req, res, next) => { 
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, 
    (err, results, fields)=>{
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success: true, value: req.body.value});
    });
});

app.listen(PORT, () => {
    log("Application start at : ", PORT);
});