const mysql = require('mysql');
const express = require('express');
const util = require('util');
const fs = require('fs');


// Create connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '25prime25',
    database: 'nodemysql'
});


const app = express();


app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql2';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});


app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Posts table created');
    });
});

app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'text text post number one'};
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('post1 was created');
    });
});

app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send('Posts fetched...');
    })
});

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Post fetched...');
    })
});

app.get('/updatepost/:id', (req, res) => {
   let newTitle = 'some updated title';
   let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Post updated...');
    })
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
});