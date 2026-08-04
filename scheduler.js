const cron = require("node-cron");

const db = require("./database");

const playPlaylist = require("./player");


let runningTasks = new Set();



function getCurrentTime(){

    const now = new Date();

    return (
        String(now.getHours()).padStart(2,"0")
        +
        ":"
        +
        String(now.getMinutes()).padStart(2,"0")
    );

}



function getTask(id){

    return new Promise((resolve,reject)=>{

        db.get(

            "SELECT * FROM tasks WHERE id=?",

            [id],

            (err,row)=>{

                if(err)
                    reject(err);

                else
                    resolve(row);

            }

        );

    });

}




function wait(seconds){

    return new Promise(resolve=>{

        setTimeout(

            resolve,

            seconds * 1000

        );

    });

}




async function runTaskLoop(task){


    if(runningTasks.has(task.id))
        return;


    runningTasks.add(task.id);


    console.log(
        "Started task:",
        task.id
    );



    try {


        while(true){


            const currentTask =
                await getTask(task.id);



            if(!currentTask ||
               currentTask.status !== "running"){


                console.log(
                    "Task stopped:",
                    task.id
                );

                break;

            }



            await playPlaylist(

                currentTask.playlist_url,

                currentTask.duration

            );



            console.log(
                "Waiting before restart:",
                currentTask.repeat_delay,
                "seconds"
            );



            await wait(

                currentTask.repeat_delay

            );


        }


    }

    catch(error){

        console.log(error);

    }


    finally{

        runningTasks.delete(task.id);

    }


}





function checkTasks(){


    const time =
        getCurrentTime();



    db.all(

        `
        SELECT *
        FROM tasks
        WHERE
        status='running'
        AND
        start_time=?
        `,

        [time],

        (err,rows)=>{


            if(err){

                console.log(err);

                return;

            }



            rows.forEach(task=>{


                runTaskLoop(task);


            });



        }

    );


}




function start(){


    console.log(
        "Scheduler Started"
    );


    cron.schedule(

        "* * * * *",

        ()=>{

            checkTasks();

        }

    );


}



module.exports={

    start

};