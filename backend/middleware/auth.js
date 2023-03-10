const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants/app");

const verifyJWT = function (req, res, next) {
  if (req.path !== "/login" && req.path !== "/register") {
    const authorization = req.headers.authorization;
    let token = "";

    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials sent!" });
    }

    if (authorization.startsWith("Bearer ")) {
      token = authorization.substring(7, authorization.length);
    } else {
      return res.status(403).json({ error: "Invalid token" });
    }
    jwt.verify(token, SECRET, (err, decode) => {
      if (err) {
        return res.status(403).json({ error: JSON.stringify(err) });
      }
      req.email = decode.email;
    });

    if (!token || token === "null") {
      return res.status(403).json({ error: "Invalid token" });
    }
    next();
  } else {
    next();
  }
};

module.exports = {
  verifyJWT,
};
