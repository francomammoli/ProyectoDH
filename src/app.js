const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//middleware  de aplicacion
const logedMiddleware = require ('./middleware/logedMiddleware');
const cookies = require('cookie-parser');
// const adminMiddleware = require('./middleware/adminMiddleware');
//volvemos accesible la capeta public para todo el proyecto
app.use(express.static('public'));
//config de session que se pasa como midelware
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized:false,
}));

app.use(bodyParser.urlencoded({ extended : true }));
//va luego de que la session se inicialize
app.use(logedMiddleware);
app.use(cookies());
// app.use(adminMiddleware);

app.listen(3000,()=>{
    console.log('Servidor funcionando');
    });

//le aclaramos a express cual es el motor de plantillas que vamos a usar
app.set('view engine','ejs');
app.set('views','./public/views');

const  mainRouter = require('./routers/main');
const userRouter = require('./routers/users');

app.use('/', mainRouter);
app.use('/',userRouter);



//error 404
app.use((req,res,next) =>{
res.status(404).render('error404');
});