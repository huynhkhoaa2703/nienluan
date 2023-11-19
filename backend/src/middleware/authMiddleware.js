const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "Error",
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Authemtication",
        status: "Error",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  console.log("userID1", userId);

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "Error",
      });
    }
    if (userId === undefined || user?.isAdmin || user?.id === userId) {
      console.log("userid2:", user?.id);
      next();
    } else {
      return res.status(404).json({
        message: "Authemtication",
        status: "Error",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};
