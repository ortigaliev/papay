const assert = require("assert");
const Definer = require("../lib/mistake");
const MemberModel = require("../schema/member.model");

class Restaurant {
  constructor() {
    this.memberModel = MemberModel;
  }

  async getAllRestaurantsData() {
    try {

    } catch (err) {
      throw err;
    }
  }
}

module.exports = Restaurant;