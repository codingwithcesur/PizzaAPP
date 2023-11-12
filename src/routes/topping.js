"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// Controllers:
const topping = require("../controllers/topping");

// URL: /toppings
router.route("/").get(topping.list).post(topping.create);

router
  .route("/:id")
  .get(topping.read)
  .put(topping.update)
  .delete(topping.delete);

/* ------------------------------------------------------- */
module.exports = router;
