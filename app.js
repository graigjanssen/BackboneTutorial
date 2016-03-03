var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/blogroll');

app.use(express.static('./public'));

app.use(bodyParser.json());

var blogs = require('./routes/api/blogs');
app.use('/api/blogs', blogs);

app.listen(3000, function(){
  console.log('Listening on 3000!');
});
