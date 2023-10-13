let memberController = module.exports;

//home controlleri
memberController.home = (req, res) => {
  console.log("GET contr.home");
  res.send("home sahifasidasiz");
};

//signup controller
memberController.signup = (req, res) => {
  console.log("POST contr.signup");
  res.send("signup sahifasidasiz");
};

//login controller
memberController.login = (req, res) => {
  console.log("POST contr.login");
  res.send("login sahifasidasiz");
};

//loguot controller
memberController.logout = (req, res) => {
  console.log("GET contr.logout");
  res.send("logout sahifasidasiz");
};