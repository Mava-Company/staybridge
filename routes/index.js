const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");


// الصفحة الرئيسية
router.get(
    "/",
    taskController.home
);


// صفحة إضافة مهمة
router.get(
    "/add",
    (req, res) => {

        res.render("add");

    }
);


// حفظ المهمة الجديدة
router.post(
    "/add",
    taskController.addTask
);


// صفحة تعديل المهمة
router.get(
    "/edit/:id",
    taskController.editPage
);


// حفظ التعديل
router.post(
    "/update/:id",
    taskController.updateTask
);


// حذف المهمة
router.get(
    "/delete/:id",
    taskController.deleteTask
);


// تشغيل المهمة
router.get(
    "/start/:id",
    taskController.startTask
);


// إيقاف المهمة
router.get(
    "/stop/:id",
    taskController.stopTask
);


module.exports = router;