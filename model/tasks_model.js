const mongoose = require('mongoose')

const task_schema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    alarme:{
        day:Number,
        hour:Number,
        minutes:Number
    },
    tempo:{
        type:Number,
        required:true
    },
    completed: {
        type:Boolean,
        default:false
    },
    created_date:{
        type: Date,
        default:Date.now
    },
    date_completed: {
        type:Date
    },
    project_id:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('tasks', task_schema)