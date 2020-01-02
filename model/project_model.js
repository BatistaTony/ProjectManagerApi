const mongoose = require('mongoose')

const project_schema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    tasks: {
        type:Number,
        default:0
    },
    tasks_done:{
        type:Number,
        default:0
    },
    created_date:{
        day:Number,
        month:Number,
        year:Number
    },
    completed_date:{
        day:Number,
        month:Number,
        year:Number
    }

})


module.exports = mongoose.model('project', project_schema)