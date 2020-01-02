const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require("body-parser")

const app = express()

app.use(bodyparser.json())

var routerProject = require('./routes/project')
var routerTask = require('./routes/task')


app.use('/project', routerProject)
app.use('/task', routerTask)


mongoose.connect('mongodb://localhost/project_manager',{ useNewUrlParser: true }, (err)=>{
    if(err){
        console.log('Db connection failed')
    }else{
        console.log('Connected to db')
    }
})


app.listen(3000)