const express = require('express');
const path = require('path')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', (req, res) => {
    res.render('home');
});


app.get('/sobre_nosotros', (req, res) => {
    res.render('sobre_nosotros');
});

app.get('/blog/:blogId', (req, res) => {
    console.log(req.params);
    res.render('blog', {blogId : req.params.blogId});
});



app.get('/iniciar_session', (req, res) => {
    res.render('iniciar_session');
});

app.get('/registrarme', (req, res) => {
    res.render('registrarme');
});


app.listen(3000);

