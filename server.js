var express = require('express');
var app = express()
const mongoose = require('mongoose');
var path = require('path');
const ejs = require ('ejs');
var bodyparser = require('body-parser');

var app = express()
app.use (bodyparser.urlencoded({
  extended: true
}));
 app.set ('view engine', 'ejs');

mongoose.connect('mongodb://localhost/studies', 
{useNewUrlParser: true}, (err) => {
if (!err) {
  console.log ('Connection to database established succesfully!');
} else {
  console.log(err);
}
});

var courseSchema = new mongoose.Schema({
  courseName:{
    type:String,
    required: 'this field is requuired'
  },
  courseId: {
    type:String
  },
  courseDuration: {
    type: String
  },
  courseFee: {
    type: String 
  }
});
const Course = mongoose.model ('Course', courseSchema);

app.get('/',(req, res)=>{
  res.render('form');
});
app.post ('/insert', (req, res, next)=>{
  var course = new Course ();
  course.courseName = req.body.courseName;
  course.courseId = req.body.courseId;
  course.courseDuration = req.body.courseDuration;
  course.courseFee = req.body.courseFee;
  course.save ((err, doc)=>{
  if (!err)
  {
    console.log('saved');
  res.redirect('/list');
  }
  else
  console.log (err);
});
});

app.get('/list', function(req, res, next) {
  Course.find()
      .then(function(doc) {
        res.render('datatable', {items: doc});
      });
});

app.get('/update/:id', (req, res) => {
  Course.findById(req.params.id, (err, doc) => {
  if (!err) {
  res.render("editform", {items: doc});
  var course = new Course ();
  items.courseName = req.body.courseName;
  items.courseId = req.body.courseId;
  items.courseDuration = req.body.courseDuration;
  items.courseFee = req.body.courseFee;
  course.save ((err, doc)=>{
  if (!err)
  {
    console.log('saved');
  res.redirect('/list');
  }
  else
  console.log (err);
});
  }
  });
  });

app.get('/delete/:id', (req, res) => {
  Course.findByIdAndRemove(req.params.id, (err, doc) => {
  if (!err) {
  res.redirect('/list');
  }
  else { console.log('Failed to Delete Course Details: ' + err); }
  });
  });





app.listen(3000,()=>{
  console.log('running on 3000');
});