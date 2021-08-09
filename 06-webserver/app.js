require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials'); 


// servir contenido estatico s
app.use(express.static('public'))
 
app.get('/', (req, res) => {

    console.log(req.ip)

    res.render('home', {
        nombre: 'Gregory Perez',
        titulo: 'Curso de Node'
    });
})

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Gregory Perez',
        titulo: 'Curso de Node'
    });
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Gregory Perez',
        titulo: 'Curso de Node'
    });
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
})

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
});