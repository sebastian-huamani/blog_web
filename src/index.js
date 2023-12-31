import { pool } from './db.js'
import express  from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

var test = '';

const body_parser = bodyParser;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(body_parser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', async (req, res) => {
    const [posts] = await pool.query('select * from post');
    const [categorias] = await pool.query('select * from categoria');
    res.render('home', {posts : posts, categorias: categorias});
}); 


app.get('/blog/categoria/:categoriaId', async (req, res) => {
    const [posts] = await pool.query(`select * from post where categoria_id = ${req.params.categoriaId}`);
    const [categorias] = await pool.query('select * from categoria');
    res.render('home', {posts : posts, categorias: categorias});
}); 

app.get('/sobre_nosotros', (req, res) => {
    res.render('sobre_nosotros');
}); 

app.get('/blog/:blogId', async (req, res) => {
    const [post] = await pool.query(`select * from post where id = ${req.params.blogId}`);
    res.render('blog', {post : post[0]});
});

app.get('/iniciar_session', (req, res) => {
    res.render('iniciar_session');
});

app.post('/autenticar_session', async (req, res) => {
    const [result] = await pool.query(`select * from usuario where email = "${req.body.email}" and password = "${req.body.password}"`);

    if(result[0] == undefined){
        res.send({alerta : 'credenciales incorrectas', status : false});
    } else {
        res.send({alerta : 'credenciales correctas', status : true});
    }

});

app.get('/registrarme', (req, res) => {
    res.render('registrarme');
});

app.post('/registrarme', async (req, res) => {
    const [resultado] = await pool.query(`INSERT INTO usuario(nombre, email, password, rol_id) VALUES ("${req.body.nombre}", "${req.body.email}", "${req.body.password}", 2)`);

    res.send({alerta : 'credenciales correctas', status : true});
});


app.get('/crear_blog',  async (req, res) => {
    const [categorias] = await pool.query(`select * from categoria`);
    res.render('crear_blog', {categorias : categorias});
});


app.post('/crear_blog',  async (req, res) => {
    const [resultado] = await pool.query(`INSERT INTO post(usuario_id, categoria_id, titulo, cuerpo, veces_leido, me_gusta, fecha_creacion, imagen_url) VALUES (1, "${req.body.categoria}",  "${req.body.titulo}", "${req.body.cuerpo}", 0, 0, "2023-12-16", "${req.body.imagen_url}")`);

    res.send({alerta : 'Blog creado con exito', status : true});
});


app.listen(3000);

