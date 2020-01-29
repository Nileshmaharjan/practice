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

module.exports = app;