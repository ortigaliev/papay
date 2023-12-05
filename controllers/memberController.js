const assert = require('assert');
const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistake");


let memberController = module.exports;

//signup controller
memberController.signup = async (req, res) => {
  try{
    console.log("POST: cont/signup");
    const data = req.body,
    member = new Member(),
    new_member = await member.signupData(data);

    const token = memberController.createToken(new_member);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({state: "succeed", data: new_member});
  } catch (err) {
    console.log(`ERROR, const/signup, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};

//login controller
memberController.login = async (req, res) => {
  try {
    console.log(`POST: cont/login`);
    const data = req.body,
    member = new Member(),
    result = await member.loginData(data);

    const token = memberController.createToken(result);
    console.log("Token:", token);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//loguot controller
memberController.logout = (req, res) => {
  console.log("GET contr.logout");
  res.send("logout sahifasidasiz");
};


memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };
    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2);
    return token;
  } catch (err) {
    throw err;
  }
};

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET cont/checkMyAuthentication");
    //console.log("tokencha:", token);
    let token = req.cookies["access_token"];
    console.log("tokencha:", token);

    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err2);

    res.json({ state: "success", data: member });
  } catch (err) {
    throw err;
  }
};