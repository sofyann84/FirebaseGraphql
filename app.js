var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const firebase = require("firebase");
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors");

 
const config = {
    apiKey: "AIzaSyDmnIhgnSPhAfJ7Gtp9aInxC7vIDhvNUGE",
    authDomain: "myphonebook-56b20.firebaseapp.com",
    databaseURL: "https://myphonebook-56b20.firebaseio.com",
    projectId: "myphonebook-56b20",
    storageBucket: "myphonebook-56b20.appspot.com",
    messagingSenderId: "716716048633"
};
firebase.initializeApp(config);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);

const userSchema = require('./graphql').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));


module.exports = app;
