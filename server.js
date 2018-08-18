const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = (`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append server.log');
    });  
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi, Welcome To My Lair',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(3000);   