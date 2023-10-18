console.log('Web serverni boshlash');
const express = require("express");
const app = express();//expressning app objectini yuboradi
const router = require("./router.js");

//MongoDB connection


// 1: Kirish code

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 2: Session Code

// 3: View Code

app.set("views","views");
app.set("view engine","ejs");

// 4: Routing code
//app.use("/resto", router_bssr);// admin va restaurant uchun kerakli router
app.use("/", router);//Xaridorlar uchun kerak bn Frontend

module.exports = app;