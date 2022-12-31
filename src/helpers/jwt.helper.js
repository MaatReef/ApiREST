const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function(user){
    // Nuestro token dura por 4 horas
    return sign({ user }, JWT_SECRET, {expiresIn: "4h"});
};
