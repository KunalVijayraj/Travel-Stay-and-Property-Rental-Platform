const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControlled = require("../controllers/users.js");

router.route("/signup")
.get(userControlled.renderSingUpForm)
.post(wrapAsync(userControlled.signup));

router.route("/login")
.get(userControlled.renderLogInForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userControlled.login);


router.get("/logout", userControlled.logout);

module.exports = router;