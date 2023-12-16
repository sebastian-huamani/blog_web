import { pool } from './db.js'
import express  from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', async (req, res) => {
    const [result] = await pool.query('select * from producto');
    // res.json(result);
    res.render('home', {productos : result});
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

