let User = require("../Models/user.js");

module.exports.renderSingUpForm = async(req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.signup = async(req, res, next) => {
    try {
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust. You are signed up.");
            res.redirect("/listings");      
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogInForm = async(req, res) => {
    res.render("./users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome to wanderlust. You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "successfully logged out");
        res.redirect("/listings");
    });
};