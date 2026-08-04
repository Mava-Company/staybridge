const Task = require("../models/taskModel");

async function home(req,res){

    try{

        const tasks=await Task.getAllTasks();

        res.render("index",{

            tasks

        });

    }

    catch(err){

        console.log(err);

        res.send("Server Error");

    }

}

async function addTask(req,res){

    try{

        await Task.createTask({

            playlist_url:req.body.playlist_url,

            start_time:req.body.start_time,

            duration:Number(req.body.duration),

            repeat_delay:Number(req.body.repeat_delay)

        });

        res.redirect("/");

    }

    catch(err){

        console.log(err);

        res.send("Database Error");

    }

}

async function editPage(req,res){

    try{

        const task=await Task.getTask(

            req.params.id

        );

        res.render("edit",{

            task

        });

    }

    catch(err){

        console.log(err);

        res.send("Task Not Found");

    }

}

async function updateTask(req,res){

    try{

        await Task.updateTask(

            req.params.id,

            {

                playlist_url:req.body.playlist_url,

                start_time:req.body.start_time,

                duration:Number(req.body.duration),

                repeat_delay:Number(req.body.repeat_delay),

                status:req.body.status

            }

        );

        res.redirect("/");

    }

    catch(err){

        console.log(err);

        res.send("Update Error");

    }

}

async function deleteTask(req,res){

    try{

        await Task.deleteTask(

            req.params.id

        );

        res.redirect("/");

    }

    catch(err){

        console.log(err);

        res.send("Delete Error");

    }

}

async function startTask(req,res){

    try{

        await Task.startTask(

            req.params.id

        );

        res.redirect("/");

    }

    catch(err){

        console.log(err);

        res.send("Start Error");

    }

}

async function stopTask(req,res){

    try{

        await Task.stopTask(

            req.params.id

        );

        res.redirect("/");

    }

    catch(err){

        console.log(err);

        res.send("Stop Error");

    }

}

module.exports={

    home,

    addTask,

    editPage,

    updateTask,

    deleteTask,

    startTask,

    stopTask

};