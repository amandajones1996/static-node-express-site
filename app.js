
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
    console.log("!!!!!!!!!!!!!!heres the request object", req)
    const projectId = req.params.id;
    const project = projects[projectId]
    console.log("!!!!!!!!!!!!!!project", projectId)
    if(project){
        res.render('project', { project })
    } else {
        const err = new Error()
        err.message = 'Oh no! It looks like you search was not found.'
        err.status = 404
        res.render("page-not-found", { err })
    }
})

// 404 handler
app.use((req, res, next) => {
    const err = new Error()
    err.message = 'Oh no! It looks like you search was not found.'
    err.status = 404
    res.render("page-not-found", { err })
})

// global error handler
app.use((err, req, res, next) => {
    err.status = err.status || 500
    err.message = err.message || "It looks like you've encountered a server error."
    console.error(`Error: ${err.message}`)
    res.render("error", { err })
})

// server
app.listen(3000, () => {
    console.log("this app is running")
})


// indiviual projects never loading page - do i need to pass "project to something?"
