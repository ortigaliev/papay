const Member = require("../models/Member");
let memberController = module.exports;

//signup controller
memberController.signup = async (req, res) => {
  try{
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);


    res.send("done");
  } catch (err) {
    console.log(`ERROR, const/signup, ${err.message}`);
  }
};

//login controller
memberController.login = (req, res) => {
  console.log("POST contr.login");//routerdan kirib kelayotgan request
  res.send("login sahifasidasiz");
};

//loguot controller
memberController.logout = (req, res) => {
  console.log("GET contr.logout");
  res.send("logout sahifasidasiz");
};