const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 10;
var letterNumber = /^[0-9a-zA-Z]+$/;
const createUser = async (username, password) => {
    const userName = username.toLowerCase();

    if (!userName) {
        throw "Username need to have valid values";
    }
    if (!password) {
        throw "Password need to have valid values";
    }
    if (
        typeof userName != "string" ||
        userName.trim().length == 0 ||
        userName.match(" ") ||
        !userName.match(letterNumber) ||
        userName.length < 4
    ) {
        throw "Entered userName Is in invalid format";
    }
    if (
        typeof password != "string" ||
        password.trim().length == 0 ||
        password.match(" ") ||
        password.length < 6
    ) {
        throw "Entered password Is in invalid format";
    }
    if (typeof password != "string" || password.trim().length == 0) {
        throw "password are not strings or are empty strings,";
    }

    const userCollection = await users();
    let validUser = {
        username: userName,
    };
    const findUser = await userCollection.findOne(validUser);

    if (findUser != null) {
        throw "there is already a user with that username";
    }
    const hash = await bcrypt.hash(password, saltRounds);

    let newUser = {
        username: userName,
        password: hash,
    };

    const insertInfo = await userCollection.insertOne(newUser);
    return insertInfo;
};

const checkUser = async (username, password) => {
    const userName = username.toLowerCase();
    if (!userName) {
        throw "Username need to have valid values";
    }
    if (!password) {
        throw "Password need to have valid values";
    }
    if (
        typeof userName != "string" ||
        userName.trim().length == 0 ||
        userName.match(" ") ||
        !userName.match(letterNumber) ||
        userName.length < 4
    ) {
        throw "Entered userName Is in invalid format";
    }
    if (
        typeof password != "string" ||
        password.trim().length == 0 ||
        password.match(" ") ||
        password.length < 6
    ) {
        throw "Entered Password Is in invalid format";
    }
    if (typeof password != "string" || password.trim().length == 0) {
        throw "password are not strings or are empty strings,";
    }
    const userCollection = await users();
    let validUser = {
        username: userName,
    };
    const findUser = await userCollection.findOne(validUser);

    if (findUser == null) {
        throw `Either the username or password is invalid`;
    } else {
        const pass = await bcrypt.compare(password, findUser.password);
        if (pass) {
            return { authenticated: true };
        } else {
            throw "Either the username or password is invalid";
        }
    }
};
module.exports = {
    createUser,
    checkUser,
};
