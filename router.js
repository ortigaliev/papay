
const express = require('express');
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");
const communityController = require("./controllers/communityController");
const orderController = require("./controllers/orderController");
const followController = require("./controllers/followController");
const uploader_community = require("./utils/upload-multer")("community");
const uploader_member = require("./utils/upload-multer")("member");
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

router.post(
  "/orders/edit",
  memberController.retrieveAuthMember,
  orderController.editChosenOrder
);

//Community related routers
router.post(
  "/community/image",
  uploader_community.single("community_image"), communityController.imageInsertion
  );

router.post(
  "/community/create",
  memberController.retrieveAuthMember,
  communityController.createArticle
);
router.get(
  "/community/articles",
  memberController.retrieveAuthMember,
  communityController.getMemberArticles
);

router.get(
  "/community/target",
  memberController.retrieveAuthMember,
  communityController.getArticles
);

router.get (
  "/community/single-article/:art_id",
  memberController.retrieveAuthMember,
  communityController.getChosenArticle
);

/* Following related route */
router.post (
  "/follow/subscribe", memberController.retrieveAuthMember,
  followController.subscribe
);
router.post (
  "/follow/unsubscribe", memberController.retrieveAuthMember,
  followController.unsubscribe
);


module.exports = router;