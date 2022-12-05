const jwt  = require('jsonwebtoken');

const generateSign = (id,email)=>{
    return jwt.sign({ id,email}, process.env.JWT_SECRET, {expiresIn: '30d'});

}

const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {generateSign, verifyJwt};

// Go Finish Auth.js in Middlewares now! still remaining. 
//make request from back end to the front next steps. 