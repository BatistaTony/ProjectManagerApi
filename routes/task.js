const express = require('express')
const task = require('./../model/tasks_model')
const project = require('./../model/project_model')

const router = express.Router()

router.get('/', async (req,res)=>{
    try{
        const findTask = await task.find()
        res.json(findTask)
    }catch(err){
        res.json({message:err})
    }
})

router.post('/', async (req,res)=>{

    try {
         var taskObj = {
        title: req.body.title,
        description:req.body.desc,
        alarme:req.body.alarme,
        tempo:req.body.time,
        project_id:req.body.project_id
    }

    }catch(err){
        res.json({message:err})
        console.log(err)
    }

   
    
    try {
         taskInsert = await new task(taskObj)
          checkProject = await project.findById({_id: taskObj.project_id})
         
    }catch(err){
        console.log(err)
    }
   
    if(checkProject != null){
    try {

        const savedTask = await taskInsert.save()

        if(savedTask.__v == 0){

            var project_id = taskInsert.project_id

            const projectFind = await project.findById({_id:project_id})

            var addTasks = projectFind.tasks +1

            const projectUpdate = await project.updateOne({_id:project_id},{$set: {tasks:addTasks}})
            
            res.json(taskInsert)

        }else{

            var error_message = {
                message: "Project doens't exist",
                code: 010
            }
            res.json(error_message)
        }

    }catch(err){
        res.json({message:err})
        console.log(err)
    }

}else{
    res.json({message: "project doesn't exist"})
}

})

router.delete('/', async (req,res)=>{
    
    var id = req.body.id

    try {

        const findTask = await task.findById({_id:id})

        var project_id = await findTask.project_id

        const deletedTask = await task.deleteOne({_id:id})
        
        if(deletedTask.deletedCount == 1){

            const findProject = await project.findById({_id:project_id})
            
            var mintasks = await findProject.tasks - 1
            
            const updateProject = await  project.updateOne({_id:project_id}, {$set: {tasks: mintasks}})

            res.json(updateProject)

        }else{

            var error_message = {
                message: "Project Doesn't exist",
                code: 010
            }

            res.json(error_message)
        }

    }catch(err){
        console.log(err)
        res.json({message:err})
    }

})

router.get('/search', async (req,res)=>{
    var id = req.body.id

    try {
        const findTask = await task.findById({_id:id})
        res.json(findTask)
    }catch(err){
        res.json({message:err})
        console.log(err)
    }
    
})


router.patch('/complete', async (req,res)=>{
    var id = req.body.id

    try {
        const completedTask = await task.updateOne({_id:id}, {$set: {completed: true}})
        const taskFind = await task.findById({_id:id})

        if(completedTask.nModified == 1){
            const projectFind  = await project.findById({_id:taskFind.project_id})
            const addtasksDone = await project.updateOne({_id:projectFind._id}, {$set: {tasks_done: projectFind.tasks_done + 1}})
        res.json(completedTask)
        }else{
            res.json({message: 'Project does not exist'})
        }
        
    }catch(err){
        console.log(err)
        res.json({message: err})
    }
})

module.exports = router