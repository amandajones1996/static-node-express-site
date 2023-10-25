const express = require('express');
const router = express.Router();
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
    console.log("heres the request object", req)
    const projectId = req.params.id;
    const projectMatched = data.projects.find(project => project.id === projectId);
    res.render('project', { project })
})

// server
app.listen(3000, () => {
    console.log("this app is running")
})