const express = require('express');
const data = require('./data.json');
const path = require('path');

const app = express();

// middleware setup of view engine to pug
app.set('viewnengine', 'pug');

// use static files
app.use(express.static('public'));


// home page route
app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
})

// about page route
app.get('/about', (req, res) => {
    res.render('about')
})

// dynamic projects route
app.get('/project/:id', (req, res) => {
    
})

// server
app.listen(3000)