"use strict";
const e = require("express");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Topping Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const ToppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "toppings", timestamps: true }
);

module.exports = mongoose.model("Topping", ToppingSchema);
