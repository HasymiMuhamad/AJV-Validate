//app.js ------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');

require('./models/user');
//const dataAdmin = require('./routes/admin');
const dataUser = require('./routes/user');
const dataPost = require('./routes/post');
const app = express();
const logger = require('morgan');
const env = require('dotenv').config()



// ---Mongoose Connection---------------------
const mongoose = require('mongoose');
const mongoDB = process.env.HASYDB;
mongoose.connect(mongoDB,{useNewUrlParser:true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connection : MongoDB'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true, parameterLimit:50000}));
app.use('/api/v1/user', dataUser);
app.use('/api/v1/post', auth.isAuthenticated, dataPost);
app.use(logger('dev'));
app.use('/static', express.static('public'));

var port = process.env.PORT || 1236;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

