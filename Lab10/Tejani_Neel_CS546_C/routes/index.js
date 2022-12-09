const usersData = require("../data").users;
var letterNumber = /^[0-9a-zA-Z]+$/;

const constructorMethod = (app) => {
    app.get("/", async (req, res) => {
        if (req.session.user != null) {
            return res.redirect("/private");
        }
        res.render("login");
    });
    app.get("/signup", async (req, res) => {
        if (req.session.user != null) {
            return res.redirect("/private");
        } else {
            res.render("signup");
        }
    });
    app.post("/signup", async (req, res) => {
        try {
            if (!req.body.username && !req.body.password) {
                throw "You must supply username and password";
            }
            if (!req.body.username) {
                throw `You must supply Username`;
            }
            if (!req.body.password) {
                throw `You must supply password`;
            }
            if (
                typeof req.body.username != "string" ||
                req.body.username.trim().length == 0 ||
                req.body.username.match(" ") ||
                !req.body.username.match(letterNumber) ||
                req.body.username.length < 4
            ) {
                throw " Entered userName Is in invalid format";
            }
            if (
                typeof req.body.password != "string" ||
                req.body.password.trim().length == 0 ||
                req.body.password.match(" ") ||
                req.body.password.length < 6
            ) {
                throw "Entered password Is in invalid format";
            }

            const newUser = await usersData.createUser(
                req.body.username,
                req.body.password
            );
            if (newUser.userInserted) {
                res.redirect("/");
            } else {
                res.status(500).render("error", {
                    error: "Internal Server Error",
                });
            }
        } catch (e) {
            res.status(400).render("signup", { error: e });
            return;
        }
    });
    app.post("/login", async (req, res) => {
        try {
            if (!req.body.username && !req.body.password) {
                throw "You must supply username and password";
            }
            if (!req.body.username) {
                throw `You must supply Username`;
            }
            if (!req.body.password) {
                throw `You must supply password`;
            }
            if (
                typeof req.body.username != "string" ||
                req.body.username.trim().length == 0 ||
                req.body.username.match(" ") ||
                !req.body.username.match(letterNumber) ||
                req.body.username.length < 4
            ) {
                throw " Entered userName Is in invalid format";
            }
            if (
                typeof req.body.password != "string" ||
                req.body.password.trim().length == 0 ||
                req.body.password.match(" ") ||
                req.body.password.length < 6
            ) {
                throw "Entered password Is in invalid format";
            }

            const newUser = await usersData.checkUser(
                req.body.username,
                req.body.password
            );
            if (newUser.authenticated) {
                req.session.user = req.body.username;
                res.redirect("/private");
            } else {
                res.status(500).render("error", {
                    error: "Internal Server Error",
                });
            }
        } catch (e) {
            res.status(400).render("login", { error: e });
            return;
        }
    });
    app.get("/private", async (req, res) => {
        res.render("private", { username: req.session.user });
    });
    app.get("/logout", async (req, res) => {
        req.session.destroy();
        res.render("logout", { data: "You have been Successfully Logged out" });
    });
};

module.exports = constructorMethod;
