
const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_member = require("./utils/upload-multer")("member");


/* **********************
*        BSSR EJS       *   An'anaviy usulda
*************************/

router_bssr.get("/", restaurantController.home);

//Restaurantga oid routerlar

router_bssr
  .get("/sign-up", restaurantController.getSignupMyRestaurant)//signup router
  .post("/sign-up",uploader_member.single("restaurant_img"), restaurantController.signupProcess);//signup router

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)//login router
  .post("/login", restaurantController.loginProcess);//login router

router_bssr.get("/logout", restaurantController.logout);//logout router

router_bssr.get("/check-me", restaurantController.checkSession);//
router_bssr.get("/products/menu", restaurantController.getMyRestaurantProducts);

router_bssr.post("/products/create",
  restaurantController.validateAuthRestaurant,
  uploader_product.array("product_images", 5),
  productController.addNewProduct
);
router_bssr.post("/products/edit/:id", restaurantController.validateAuthRestaurant, productController.updateChosenProduct);

router_bssr.get(
  "/all-restaurants",
  restaurantController.validateAdmin,
  restaurantController.getAllRestaurants
);

router_bssr.post(
  "/all-restaurants/edit",
  restaurantController.validateAdmin,
  restaurantController.updateRestaurantByAdmin
);

module.exports = router_bssr;