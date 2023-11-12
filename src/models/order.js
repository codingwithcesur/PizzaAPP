"use strict";
const e = require("express");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Order Model:

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantitiy: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
