
// imports
const express = require('express');
const { projects } = require('./data.json');
const path = require('path');

const app = express();
const router = express.Router();

// middleware setup of view engine to pug
app.set('view engine', 'pug');

// use static files
app.use("/static", express.static('public'));

app.use(express.urlencoded({ extended: false }))


// home page route
app.get('/', (req, res) => {
    res.render('index', { projects });
})

// about page route
app.get('/about', (req, res) => {
    res.render('about')
})

// dynamic projects route
app.get('/projects/:id', (req, res) => {
    console.log("heres the request object", req)
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === projectId);
    res.render('project', { project })
})

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('Not Found')
})

// server
app.listen(3000, () => {
    console.log("this app is running")
})