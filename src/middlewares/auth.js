//auth roles + CRUD
// need to complete this code 
const User = require('../api/users/users.model');
const {verifyJwt} = require () // added jwt 


// check the code below & revise for changes to adapt to my code. 

/* const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return next("Unauthorized");
      }
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      userLogged.password = null;
      req.user = userLogged;
      next();
    } catch (error) {
      return next("You cannot access");
    }
  };
  
  const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return next("Unauthorized");
      }
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      if (userLogged.rol === "admin") {
        userLogged.password = null;
        req.user = userLogged;
        next();
      } else {
        error = new Error("Only admin can do this");
        return res.status(400).json(error);
      }
      } catch (error) {
      return res.status(500).json(error)
    }
  };
  
  module.exports = { isAuth, isAdmin }; */