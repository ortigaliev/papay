
const express = require('express');
const router = express.Router();
const memberController = require("./controllers/memberController")


//memberga oid routerlar
router.get("/", memberController.home);//home router

router.post("/signup",memberController.signup);//signup router

router.post("/login", memberController.login);//login router

router.get("/logout", memberController.logout);//logout router

module.exports = router;