const db = require("../database");



async function getAllTasks(){

    const result = await db.query(

        `

        SELECT *

        FROM tasks

        ORDER BY id DESC

        `

    );

    return result.rows;

}





async function getTask(id){

    const result = await db.query(

        `

        SELECT *

        FROM tasks

        WHERE id=$1

        `,

        [id]

    );

    return result.rows[0];

}





async function createTask(data){

    await db.query(

        `

        INSERT INTO tasks(

            playlist_url,

            start_time,

            duration,

            repeat_delay,

            status

        )

        VALUES(

            $1,

            $2,

            $3,

            $4,

            'running'

        )

        `,

        [

            data.playlist_url,

            data.start_time,

            data.duration,

            data.repeat_delay

        ]

    );

}





async function updateTask(id,data){

    await db.query(

        `

        UPDATE tasks

        SET

            playlist_url=$1,

            start_time=$2,

            duration=$3,

            repeat_delay=$4,

            status=$5

        WHERE id=$6

        `,

        [

            data.playlist_url,

            data.start_time,

            data.duration,

            data.repeat_delay,

            data.status,

            id

        ]

    );

}





async function deleteTask(id){

    await db.query(

        `

        DELETE FROM tasks

        WHERE id=$1

        `,

        [id]

    );

}





async function startTask(id){

    await db.query(

        `

        UPDATE tasks

        SET status='running'

        WHERE id=$1

        `,

        [id]

    );

}





async function stopTask(id){

    await db.query(

        `

        UPDATE tasks

        SET status='stopped'

        WHERE id=$1

        `,

        [id]

    );

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
