
const express = require('express');
const router = express.Router();
const memberController = require("./controllers/memberController");
/* **********************
*        REST API       *   Zamonaviy usulda
*************************/

//memberga oid routerlar

router.post("/signup",memberController.signup);//signup router
router.post("/login", memberController.login);//login router
router.get("/logout", memberController.logout);//logout router
router.get("/check-me", memberController.checkMyAuthentication);//checkMyAuthentication router
router.get("/member/:id", memberController.retrieveAuthMember, memberController.getChosenMember);

//boshqa routerlar
router.get("/menu", (req, res) => {
  res.send("Menu sahifasidasiz")
});

router.get("/community", (req, res) => {
  res.send("Jamiyat sahifasidasiz")
});

module.exports = router;