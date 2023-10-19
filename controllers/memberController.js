let memberController = module.exports;
const Member = require("../models/Member");

//signup controller
memberController.signup = async (req, res) => {
  try{
    console.log("POST: cont/signup");
    const data = req.body,
    member = new Member(),
    new_member = await member.signupData(data);

    res.json({state: "succeed", data: new_member});
  } catch (err) {
    console.log(`ERROR, const/signup, ${err.message}`);
    res.json({state: "fail", message: err_message});
  }
};

//login controller
memberController.login = async (req, res) => {
  try{
    console.log("POST: cont/login");
    const data = req.body,
    member = new Member(),
    result = await member.loginData(data);

    res.json({state: "succeed", data: result});
  } catch (err) {
    console.log(`ERROR, const/login, ${err.message}`);
    res.json({state: "fail", message: err_message});
  }
};

//loguot controller
memberController.logout = (req, res) => {
  console.log("GET contr.logout");
  res.send("logout sahifasidasiz");
};
