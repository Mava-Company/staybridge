const cron = require("node-cron");
process.env.TZ = "Europe/Istanbul";
const db = require("./database");

const playPlaylist = require("./player");

let runningTasks = new Set();

function getCurrentTime(){

    const now = new Date();

    console.log(
        "APP TIME:",
        now.toString()
    );

    return (
        String(now.getHours()).padStart(2,"0")
        +
        ":"
        +
        String(now.getMinutes()).padStart(2,"0")
    );

}

async function getTask(id) {

    const result = await db.query(

        `
        SELECT *
        FROM tasks
        WHERE id = $1
        `,

        [id]

    );

    return result.rows[0];

}

function wait(seconds) {

    return new Promise(resolve => {

        setTimeout(resolve, seconds * 1000);

    });

}

async function runTaskLoop(task) {

    if (runningTasks.has(task.id))
        return;

    runningTasks.add(task.id);

    console.log("Started task:", task.id);

    try {

        while (true) {

            const currentTask = await getTask(task.id);

            if (!currentTask || currentTask.status !== "running") {

                console.log("Task stopped:", task.id);

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

            await wait(currentTask.repeat_delay);

        }

    }

    catch (error) {

        console.log(error);

    }

    finally {

        runningTasks.delete(task.id);

    }

}

async function checkTasks() {

    try {

        const time = getCurrentTime();

        const result = await db.query(

            `
            SELECT *
            FROM tasks
            WHERE status='running'
            AND start_time=$1
            `,

            [time]

        );

        const rows = result.rows;

        rows.forEach(task => {

            runTaskLoop(task);

        });

    }

    catch (err) {

        console.log(err);

    }

}

function start() {

    console.log("Scheduler Started");

    cron.schedule("* * * * *", async () => {

        await checkTasks();

    });

}

module.exports = {

    start

};
