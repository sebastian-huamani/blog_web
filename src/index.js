const express = require('express');
const path = require('path')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/sobre-nosotros', (req, res) => {
    res.render('sobre_nosotros');
});


app.get('/blog/:blogId', (req, res) => {
    res.render('blog');
});

app.listen(3000);

