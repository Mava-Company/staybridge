require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const scheduler = require("./scheduler");

// إنشاء قاعدة البيانات
require("./database");

// الراوتر
const indexRoutes = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3000;

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRoutes);

// تشغيل المجدول
scheduler.start();

// تشغيل السيرفر
app.listen(PORT, () => {

    console.log("======================================");
    console.log("YouTube Playlist Scheduler Started");
    console.log("Server Port :", PORT);
    console.log("======================================");

});