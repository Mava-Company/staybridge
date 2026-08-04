const db = require("../database");

function getAllTasks() {

    return new Promise((resolve, reject) => {

        db.all(

            "SELECT * FROM tasks ORDER BY id DESC",

            [],

            (err, rows) => {

                if (err)
                    return reject(err);

                resolve(rows);

            }

        );

    });

}

function getTask(id) {

    return new Promise((resolve, reject) => {

        db.get(

            "SELECT * FROM tasks WHERE id=?",

            [id],

            (err, row) => {

                if (err)
                    return reject(err);

                resolve(row);

            }

        );

    });

}

function createTask(data) {

    return new Promise((resolve, reject) => {

        db.run(

            `INSERT INTO tasks
            (
                playlist_url,
                start_time,
                duration,
                repeat_delay,
                status
            )
            VALUES(?,?,?,?,?)`,

            [

                data.playlist_url,

                data.start_time,

                data.duration,

                data.repeat_delay,

                "running"

            ],

            function(err) {

                if (err)
                    return reject(err);

                resolve(this.lastID);

            }

        );

    });

}

function updateTask(id, data) {

    return new Promise((resolve, reject) => {

        db.run(

            `UPDATE tasks
             SET
             playlist_url=?,
             start_time=?,
             duration=?,
             repeat_delay=?,
             status=?
             WHERE id=?`,

            [

                data.playlist_url,

                data.start_time,

                data.duration,

                data.repeat_delay,

                data.status,

                id

            ],

            function(err){

                if(err)
                    return reject(err);

                resolve(true);

            }

        );

    });

}

function deleteTask(id){

    return new Promise((resolve,reject)=>{

        db.run(

            "DELETE FROM tasks WHERE id=?",

            [id],

            function(err){

                if(err)
                    return reject(err);

                resolve(true);

            }

        );

    });

}

function startTask(id){

    return new Promise((resolve,reject)=>{

        db.run(

            "UPDATE tasks SET status='running' WHERE id=?",

            [id],

            function(err){

                if(err)
                    return reject(err);

                resolve(true);

            }

        );

    });

}

function stopTask(id){

    return new Promise((resolve,reject)=>{

        db.run(

            "UPDATE tasks SET status='stopped' WHERE id=?",

            [id],

            function(err){

                if(err)
                    return reject(err);

                resolve(true);

            }

        );

    });

}

module.exports={

    getAllTasks,

    getTask,

    createTask,

    updateTask,

    deleteTask,

    startTask,

    stopTask

};