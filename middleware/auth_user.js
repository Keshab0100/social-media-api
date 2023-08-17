import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    console.log("token: " + token)
    console.log("process.env.jwt_key: " + process.env.jwt_key)
    const decoded = jwt.verify(token, process.env.jwt_key);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed again",
      error: error,
    });
  }
};

export default checkAuth