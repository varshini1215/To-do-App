var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var router = require('./router');

app.use(cors(
  origin:["https://deploy-TodoApp.vercel.app"],
  methods:["POST","GET"],
  credentials:true
));
app.use(express.json());
app.use('/api/tasks', router);

var mongooseurl = "mongodb://localhost:27017/todolist";
mongoose.connect(mongooseurl)
  .then(success => {
    console.log("connected to mongodb");

    // Use the PORT environment variable provided by Render
    var port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log("error", error);
  });
