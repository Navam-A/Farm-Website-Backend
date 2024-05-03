let jwt = require("jsonwebtoken");

let validate = (req, res, next) => {
  try {
    let token = req.header("x-token");
    if (!token) res.send("Token is not generated");
    let decode = jwt.verify(token, "jwtToken");
    req.user = decode.user;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = validate;
