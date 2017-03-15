var bodyParser= require('body-parser');

var mongoose= require ('mongoose');

mongoose.Promise = global.Promise;

//connect to database

mongoose.connect('mongodb://test:test@ds011883.mlab.com:11883/todo')

//create a schema for mongoDB

var todoSchema= new mongoose.Schema({
    item: String
})

//creating a model for mongo mongoDB

var Todo= mongoose.model('Todo', todoSchema);
// var itemOne= Todo({ item: 'XYZ'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved')
// })

var urlencodedParser= bodyParser.urlencoded({extended: false});
// var data= [
//     {
//         item: 'going to gym'
//     }, 
//     {
//         item: 'doing exercise'
//     }, 
//     {
//         item: 'goin for walk'
//     }
//         ]
module.exports = function (app){

    app.get('/', function(req, res){
         Todo.find({}, function(err, data){
             if (err) throw err;
             res.render('todo', {todos: data})
         })

     })

     app.get('/todo', function(req, res){
         Todo.find({}, function(err, data){
             if (err) throw err;
             res.render('todo', {todos: data})
         })

     })

     app.post('/todo',urlencodedParser, function(req, res){
        //  console.log('sdsdd')
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data)
        })
        // data.push(req.body);
        // res.json(data);
        // console.log(req.body);
     })

     app.delete('/todo/:item', function(req, res){
         Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
             if (err) throw err;
             res.json(data)
         })
        //  console.log('delete request', req.params.item);
        //  data = data.filter(function(todo){
        //      console.log(todo.item.replace(/ /g, '-'), req.params.item)
        //      return todo.item.replace(/ /g, '-') !== req.params.item;
        //  });
        //  res.json(data)
     })
}