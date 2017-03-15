var express = require ('express');
var todoController = require('./controllers/todoController');
var app = express();

// setup template engine with ejs

app.set('view engine', 'ejs');

//static files like css 

app.use(express.static('./public'))

//fire controllers

todoController(app)

//listening to port 3000

app.listen(3000);
console.log('server is listening to port 3000');