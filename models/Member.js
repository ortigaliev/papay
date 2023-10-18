const MemberModel = require("../schema/member.model.js");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try{
      const new_member = new this.memberModel(input);
      console.log("I am here");

      const result = await new_member.save();
      console.log(result);

      return result;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = Member;