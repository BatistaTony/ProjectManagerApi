const express = require('express')
const project = require('./../model/project_model')
const task = require('./../model/tasks_model')

const router = express.Router()

router.get('/', async (req,res)=>{
    const projectFind = await project.find()
    res.json(projectFind)
})

router.get('/search', async (req,res)=>{
    var id = req.body.id

    try {
        const projectFind = await project.findById({_id:id})
        res.json(projectFind)
    }catch(err){
        res.json({message:err})
        console.log(err)
    }
})

router.post('/', async (req,res)=>{
   
    var monthDay = 31

    

    var pday = req.body.created_date
    switch(pday.month){
        case 4: {
            monthDay = 30
            break;
        }

        case 6: {
            monthDay = 30
            break;
        }

        case 9: {
            monthDay = 30
            break;
        }

        case 11: {
            monthDay = 30
            break;
        }

        case 6: {
            monthDay = 30
            break;
        }

        case 2: {
            monthDay = 28
            break;
        }

    }
    
    pday = await (monthDay - pday.day)

    var cday = req.body.completed_date
    cday = cday.day

    pday = cday+pday

    

    var projectObj = {
        name: req.body.nome,
        description:req.body.description,
        days: pday,
        created_date:req.body.created_date,
        completed_date:req.body.completed_date
    }

    console.log(projectObj)


    
    const projectInsert = await new project(projectObj)

    try {
        const savedProject = projectInsert.save()
        res.json(projectInsert)
    }catch(err){
        res.json({message:err})
        console.log(err)
    }
    
})

router.delete('/', async (req,res)=>{

    var id  = req.body.id

    try {
        
        const projectFind = await project.findById({_id:id})
        const projectDeleted = await project.deleteOne({_id:id})

        if(projectDeleted.deletedCount == 1){
            const deletedTask = await task.deleteMany({project_id:id})
            res.json(deletedTask)
        }else{
            res.json({message: 'Project was not deleted'})
        }

        
    }catch(err){
        res.json({message:err})
        console.log(err)
    }

})

module.exports = router