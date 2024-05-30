var express= require('express');
var app=express();
var port=8000;
var cors=require('cors');

var mongoose=require('mongoose');
app.use(cors());
var router=require('./router');
app.use(express.json());
app.use('/api/tasks',router);

var mongooseurl="mongodb://localhost:27017/todolist"
mongoose.connect(mongooseurl)
.then(success=>{
    console.log("connected to mongodb");
    app.listen(port,()=>{
        console.log("server is running");
    });
})
    .catch(error=>{
        console.log("error")
   
});
