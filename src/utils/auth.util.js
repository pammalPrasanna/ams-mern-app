var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
var JWTD = require("jwt-decode");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



module.exports = { generateToken };