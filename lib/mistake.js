class Definer {
  /** general errors */
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that param!";
  static general_err3 = "att: file upload error!";


  /** member auth related error*/
  static auth_err1 = "att: mongodb validation failed!";
  static auth_err3 = "att: no member with that mb_nick!";
  static auth_err4 = "att: your credentials do not match!";


  /** product auth related error */
  static product_err1 = "att: product creation is failed!";
}

module.exports = Definer;