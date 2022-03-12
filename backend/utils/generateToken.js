const jwt = require('jsonwebtoken');                                 // importing jsonwebtoken inorder to share security information

// function to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {             // generating token using user id
    expiresIn: '30d',                                           // expiry date for token is 30d
  })
}

module.exports = generateToken;