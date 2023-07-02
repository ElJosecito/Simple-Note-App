//Load Express
const express = require('express');

//initialize express
const app = express();

//mongoose connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NotesDB',);
const db = mongoose.connection;

//check connection for DB

db.once('open', function(){
    console.log('Connected to MongoDB Successfully');
});
db.on('error', function(err){
    console.error(err);
});

//cors middleware
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());

//import routes

//get all
const notes = require('./routes/notes');
app.use('/notes', notes);

//get one note
app.use('/notes/:id', notes);
//post a note
app.post('notes/post', notes);
//update a note
app.put('notes/update/:id', notes);
//delete a note
app.put('notes/delete/:id', notes);
//restore a note
app.put('notes/restore/:id', notes);


//start server
const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});