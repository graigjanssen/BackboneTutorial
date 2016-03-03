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

router.put('/:id', function(req, res){
      // 1. Which thing to update?  2. New Data  3. Then what?
  Blog.update({_id: req.params.id}, req.body, function(err){
    res.send({_id: req.params.id});
  });
});

router.delete('/:id', function(req, res){
  Blog.remove({_id: req.params.id}, function(err){
      // Client side is expecting to do response._id for console logging
      res.send({_id: req.params.id});
  });
});

module.exports = router;
