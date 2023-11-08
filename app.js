console.log('Web serverni boshlash');
const express = require("express");
const app = express();//expressning app objectini yuboradi
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);//mongodb ni storege hosil qilishga yordam beradi
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});


// 1: Kirish code

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 2: Session Code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30 minuts
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function(req, res, next){
  res.locals.member = req.session.member;
  next();
});

// 3: View Code

app.set("views","views");
app.set("view engine","ejs");

// 4: Routing code
app.use("/resto", router_bssr);// admin va restaurant uchun kerakli router
app.use("/", router);//Xaridorlar uchun kerak bn Frontend

module.exports = app;