const express = require("express");

const router = express.Router();

const Task = require("../models/taskModel");

// جميع المهام
router.get("/tasks", async (req, res) => {

    try {

        const tasks = await Task.getAllTasks();

        res.json({

            success: true,

            data: tasks

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

// مهمة واحدة
router.get("/tasks/:id", async (req, res) => {

    try {

        const task = await Task.getTask(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        res.json({

            success: true,

            data: task

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

module.exports = router;