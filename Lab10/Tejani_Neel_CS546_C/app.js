const express = require("express");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", static);
const session = require("express-session");
app.use(express.json());
app.use(
    session({
        name: "AuthCookie",
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/private", (req, res, next) => {
    console.log(req.session.id);
    if (!req.session.user) {
        return res
            .status(403)
            .render("error", { error: "User is not logged in" });
    } else {
        next();
    }
});

app.use((req, res, next) => {
    const date = new Date().toUTCString();
    const method = req.method;
    const route = req.originalUrl;
    let str;
    if (req.session.user == null) {
        str = "Non-authenticated user";
    } else {
        str = "Authenticated user";
    }
    console.log(`[${date}]: ${method} ${route} ${str}`);
    next();
});
configRoutes(app);

app.listen(3022, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
