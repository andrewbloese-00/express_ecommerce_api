
const User = require('../MongoDB/Models/User');
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");


exports.getUser = async ( req, res, next ) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  if (!token) {
    return next(new ErrorResponse("Invalid Token, Access Denied", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    let usr = user
    delete usr.password

    res.status(200).json({ user: usr })    
    

    
  } catch (err) {
    console.error(err)
  }
};