const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config/index');

const expHandelbars = require('express-handlebars');

const path = require('path');

const app = express();




// The `useMongoClient` option is no longer necessary in mongoose 5.x, so remove it.
mongoose.connect(config.dbConfig.uri, config.dbConfig.options).then( () => {
    console.log('we\'re connected to the database!');
}).catch((error) => {
    console.log('connection error:',error.message);
    process.exit();
});


// parse application/json
app.use( bodyParser.json() );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const hbs = expHandelbars.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: require('./helpers/handlebars')
});

app.engine('hbs', expHandelbars({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'} ));
// app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/v1')(app)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     // console.log('error has been caught ');
//     let err = new Error('Not Found.');
//     err.status = 404;
//     next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//     err.status = err.status || 500 ;
//     if( req.xhr && req.accepts('json') ) {
//         res.json({
//             message: err.message || 'Internal Server Error.',
//             data:{}
//         });
//     } else {
//         res.status(err.status);
//         res.json({
//             message:err.message,
//             data:{}
//         });
//     }
//     // console.log('error has been sent::'+err);
// });

module.exports = app;