const mongoose = require("mongoose");
const {
  member_type_enum,
  member_status_enum,
  ordinary_enums,
 } = require("../lib/config");

const memberSchema = new mongoose.Schema({
  mb_nick: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  mb_phone: {
    type: String,
    required: true
  },
  mb_password: {
    type: String,
    required: true,
    selected: false
  },
  mb_type: {
    type: String,
    required: false,
    default: "USER",
    enum: {
      values: member_type_enum,
      message: "{value} is not among permitted values"
    },
  },
  mb_status: {
    type: String,
    required: false,
    default: "ACTIVE",
    enum: {
      values: member_status_enum,
      message: "{value} is not among permitted values"
    },
  },
  mb_address: {
    type: String,
    required: false
  },
  mb_description: {
    type: String,
    required: true
  },
  mb_image: {
    type: String,
    required: false
  },
  mb_point: {
    type: Number,
    required: false,
    defaulta: 0
  },
  mb_top: {
    type: String,
    required: false,
    default: "N",
    enum: {
      value: ordinary_enums,
      message: "{value} is not among permitted values"
    },
  },
  mb_views: {
    type: String,
    required: false,
    default: 0
  },
  mb_likes: {
    type: String,
    required: false,
    default: 0
  },
  mb_follow_cnt: {
    type: String,
    required: false,
    default: 0
  },
  mb_subscribe_cnt: {
    type: String,
    required: false,
    default: 0
  },
},
  { timestamps: true }
);
exports.memberSchema = memberSchema;
