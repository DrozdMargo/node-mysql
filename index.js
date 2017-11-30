const db = require('./db');
const express = require('express');
const util = require('util');
const fs = require('fs');

const connection = db.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '25prime25',
    database: 'nodemysql'
});

const app = express();


app.get('/createdb', async (req, res) => {
    const sql = 'CREATE DATABASE node01';
    const result = await connection.queryAsync(sql);
    console.log(result);
    res.send('Database created...');
});


app.get('/createpoststable', async (req, res) => {
    const sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    const result = await connection.queryAsync(sql);
    console.log(result);
    res.send('Posts table created');
});


app.get('/addpost1', async (req, res) => {
    const post = {title: 'Post One', body: 'text text post number one'};
    const sql = 'INSERT INTO posts SET ?';
    const result = await connection.queryAsync(sql, post);
    console.log(result);
    res.send('post1 was created');

});

app.get('/getposts', async (req, res) => {
    const sql = 'SELECT * FROM posts';
    const results = await connection.queryAsync(sql);
    console.log(results);
    res.send('Posts fetched...');

});

app.get('/getpost/:id', async (req, res) => {
    const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    const result = await connection.queryAsync(sql);
    console.log(result);
    res.send('Post fetched...');
});

app.get('/updatepost/:id', async (req, res) => {
    const newTitle = 'some updated title';
    const sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    const result = await connection.queryAsync(sql);
    console.log(result);
    res.send('Post updated...');
});

app.get('/deletepost/:id', async (req, res) => {
    const sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    const result = await connection.queryAsync(sql);
    console.log(result);
    res.send('Post deleted...');
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
});