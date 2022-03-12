const asyncHandler  = require('express-async-handler');                      // importing asynchandler middleware to handle exception in async express routes
const User         = require('../models/userModel');                     // importing product model for crud and different operation
const jwt          = require('jsonwebtoken');
// the following middleware will be useful to check whether a user has access to particular api
// for accessing user profile a user has to logged in

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    // check if request headers has authorization value and startwith bearer
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) 
    {
        try 
        {
            token = req.headers.authorization.split(' ')[1]                         // spliting authorization value to gain access token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);              // decode access token
            req.user = await User.findById(decoded.id).select('-password')          // after decoding look for user using its value except user password
    
            next();
        } 
        catch (error) 
        {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
  
    if (!token) 
    {
        // if there is no token then set status as 401 and return  a message
        res.status(401)
        throw new Error('Not authorized, no token')
    }
});

// method to authenticate admin user
// some apis will have access only to the admin user 
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin)                       // check if there is user in request as well as he/she is an admin
    {
        next();                                             // if true, pass to next middle ware
    } 
    else 
    {
        // setting status as 404 and throwing error
        res.status(401);                                   
        throw new Error('Not authorized as an admin')
    }
};
  

module.exports = {protect, admin};