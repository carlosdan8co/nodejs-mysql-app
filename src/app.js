const express = require('express');
const morgan=require('morgan');
const exphbs =require ('express-handlebars');
const path = require('path');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


//initializations
const app = express();

//settings
app.set('port',process.env.PORT||4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars'),
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine','.hbs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global variables
app.use((req,res,next)=>{

    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use('/links',require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname,'public')));

module.exports= app;