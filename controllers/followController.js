const assert = require('assert');
const Definer = require('../lib/mistake');
const Follow = require("../models/Follow");
let followController = module.exports;

followController.subscribe = async (req, res) => {
  try {
    console.log("POST: cont/subscribe"); //modul(CORE),external,file
    assert.ok(req.member, Definer.auth_err5);//4 xil 1-bcdagi validation

    const follow = new Follow();
    await follow.subscribeData(req.member, req.body);

    res.json({ state: "success", data: "subscribed" });
  }catch (err) {
    console.log(`ERROR, cant/subscribe, ${err.message}`);
    res.json({ state: "fail", message: err.message});
  }
};

followController.unsubscribe = async (req, res) => {
  try{
    console.log("POST: cont/unsubscribe");
    assert.ok(req.member, Definer.auth_err5);

    const follow = new Follow();
    await follow.unsubscribeData(req.member, req.body);

    res.json({ state: "success", data: "unsubscribe" });
  }catch (err) {
    console.log(`ERROR cont/unsubscribe ${err.message}`);
    res.json({ state: "fail", message: err.messsage});
    throw err;
  }
};

followController.getMemberFollowings = async (req, res) => {
  try{
    console.log("GET: cont/getMemberFollowings");
    const follow = new Follow();
    const result = await follow.getMemberFollowingsData(req.query);

    res.json({ status: "success", data: result});
  }catch (err) {
    console.log(`ERROR, cont/getMemberFollowings, ${err.message}`);
    res.json({ status: "fail", message: err.message});
  }
};

followController.getMemberFollowers = async (req, res) => {
  try {
      console.log("GET: cont/getMemberFollowers");
      const follow = new Follow();
      const result = await follow.getMemberFollowersData(req.member, req.query);

      res.json({ state: "success", data: result });

  } catch(err) {
      console.log(`ERROR: cont/getMemberFollowers, ${err.message}`);
      res.json({state: 'fail', message: err.message});

  }
};