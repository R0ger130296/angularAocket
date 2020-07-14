const jwt = require("jsonwebtoken");

//Middleware(next) nos permite dar paso al siguiente proceso.
let auth = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, req.sessionID, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Invalid token",
      });
    } else {
      req.decode = decode;

      let token = jwt.sign({ data: decode.data }, req.sessionID, {
        algorithm: "HS256",
        expiresIn: 300,
      });

      req.token = token;

      next();
    }
  });
};

module.exports = {
  auth,
};
