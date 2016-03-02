var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Blog = require('../models/blog');

// Sample Blog //

var sampleBlog = new Blog({
  author: 'Rick',
  title: 'Defrakulators and how to use them',
  url: 'http://www.wldd.com'
});

sampleBlog.save();

router.get('/', function(req, res){
  Blog.find({}, function(err, dbBlogs){
    res.json({blogs: dbBlogs});
  });
});

module.exports = router;
