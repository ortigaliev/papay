
const express = require('express');
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");
const orderController = require("./controllers/orderController");
/* **********************
*        REST API       *   Zamonaviy usulda
*************************/

//member related routers

router.post("/signup",memberController.signup);//signup router
router.post("/login", memberController.login);//login router
router.get("/logout", memberController.logout);//logout router
router.get("/check-me", memberController.checkMyAuthentication);//checkMyAuthentication router
router.get("/member/:id", memberController.retrieveAuthMember, memberController.getChosenMember);


//Product related router
router.post("/products", memberController.retrieveAuthMember, productController.getAllProducts);

router.get("/products/:id", memberController.retrieveAuthMember, productController.getChosenProduct);

//Restaurant related
router.get(
  "/restaurants",
  memberController.retrieveAuthMember,
  restaurantController.getRestaurants
);
router.get(
  "/restaurants/:id",
  memberController.retrieveAuthMember,
  restaurantController.getChosenRestaurant
);

router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);

router.get(
  "/orders",
  memberController.retrieveAuthMember,
  orderController.getMyOrders
);


module.exports = router;