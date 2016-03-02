var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/blogroll');

app.use(express.static('./public'));

var blogroll = require('./routes/blogroll');
app.use('/blogroll', blogroll);

app.listen(3000, function(){
  console.log('Listening on 3000!');
});
