"use strict";

/* ------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// Controllers:
const user = require("../controllers/user");

// URL: /users
router.route("/").get(user.list).post(user.create);

router.route("/:id").get(user.read).put(user.update).delete(user.delete);

/* ------------------------------------------------------- */
module.exports = router;
