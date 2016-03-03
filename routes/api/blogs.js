var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Blog = require('../../models/blog');

// Sample Blog //

// var sampleBlog = new Blog({
//   author: 'Rick',
//   title: 'Defrakulators and how to use them',
//   url: 'http://www.wldd.com'
// });
//
// sampleBlog.save();

router.get('/', function(req, res){
  Blog.find({}, function(err, dbBlogs){
    res.send(dbBlogs);
  });
});

router.post('/', function(req, res){
  // New blog from request body (using body-parser)
  var blog = new Blog(req.body);
  blog.save(function(err, dbBlog){
    res.send(dbBlog);
  });
});

module.exports = router;
