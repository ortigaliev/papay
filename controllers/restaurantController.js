const assert = require("assert");
const Definer = require("../lib/mistake");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Restaurant =require("../models/Restaurant")

let restaurantController = module.exports;

restaurantController.home = async (req, res) => {
  try{
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};


restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: controller/getMyRestaurantProducts");
    // TODO: Get my restaurant products
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data }); //  It renders (koʻrsatuvchi) a view called "restaurant-menu".
  } catch (error) {
    console.log(`Error, cont/getMyRestaurantProducts, ${error.message}`);
    res.redirect("/resto");
  }
};



restaurantController.getSignupMyRestaurant = async (req, res) =>{
  try{
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, const/getSignupMyRestaurant, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

restaurantController.signupProcess = async (req, res) => {
  try{
    console.log("POST: cont/signupProcess");
    assert.ok(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert.ok(req.file, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR, const/signupProcess, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//login controller
restaurantController.getLoginMyRestaurant = async (req, res) =>{
  try{
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");

  } catch (err) {
    console.log(`ERROR, const/getLoginMyRestaurant, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
}

restaurantController.loginProcess = async (req, res) => {
  try{
    console.log("POST: cont/loginProcess");
    const data = req.body,
    member = new Member(),
    result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
      ? res.redirect("/resto/all-restaurants")
      : res.redirect("/resto/products/menu");

    });

  } catch (err) {
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//loguot controller
restaurantController.logout = (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy (function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message});
  }

};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
  res.json({
    state: "fail",
    message: "only authenticated members with restaurant type are allowed",
  });
};

//check-me controller
restaurantController.checkSession = (req, res) => {
  if (req.session?.member){
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated."});
  }
};

restaurantController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    req.member = req.session.member;
    next();
  } else {
    const html = `<script>
    alert('Admin page: Permission denied');
    window.location.replace('/resto');
    </script>`;
    res.end(html);
  }
};

restaurantController.getAllRestaurants = async (req, res) => {
  try {
    console.log("GET cont/getAllRestaurants");


    const restaurant = new Restaurant();
    const restaurants_data = await restaurant.getAllRestaurantsData();
    res.render("all-restaurants", {restaurants_data: restaurants_data});

  } catch (err) {
    console.log(`ERROR, cont/getAllRestaurants, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.updateRestaurantByAdmin = async (req, res) => {
  try {
    console.log("GET cont/updateRestaurantByAdmin");
    const restaurant = new Restaurant();
    const result = await restaurant.updateRestaurantByAdmin(req.body);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateRestaurantByAdmin, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};