const asyncHandler  =  require('express-async-handler');                      // importing asynchandler middleware to handle exception in async express routes
const User         = require('../models/userModel');                     // importing product model for crud and different operation
const generateToken = require('../utils/generateToken');                  // importing generate token function
const sgMail = require('@sendgrid/mail')
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, phoneNumber,password } = req.body;               // destructuring the data from request body                 
  
    const user = email                                              // login is using number or email
                ? await User.findOne({ email })                     // if email then find user by email 
                : await User.findOne({ phoneNumber });              // else using phone number
  
    if (user && (await user.matchPassword(password)))               // check for user and password are exactly matching or not
    {
        // send user data as response
        res.json({
            _id         : user._id,
            name        : user.name,
            phoneNumber : user.phoneNumber,
            email       : user.email,
            isAdmin     : user.isAdmin,
            token       : generateToken(user._id),
        })
    } 
    else 
    {
        // else throw error
        res.status(401)
        throw new Error('Invalid email or password')
    }
});


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, password } = req.body                 // destructuring the data from request body 
    const userExists = await User.findOne({ email,phoneNumber });           // checking if user exist with same email and phone number
  
    if (userExists)                                                         // if userExist if condition becomes true
    {       
        res.status(400)                                                       // setting response status as 400           
        throw new Error('User already exists');                               // throwing new user
    }
    
    // if user doesn't exist then we need to create a new user
    const user = await User.create({
        name,
        phoneNumber,
        email,
        password,
    });
  
    if (user)                                                              // if user is created it will make if condition true
    {
        res.status(201).json({                                             // setting response status as 201 and returning the user object
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } 
    else 
    {
        // else setting res status as 400 and throwing new error
        res.status(400)
        throw new Error('Invalid user data')
    }
});




// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);                 // find user by its id  
    
    // if user exist then if condition below will become true
    if (user) 
    {
        // send user info in json format
        res.json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } 
    else 
    {
        // else set status as 404 and throw a error
        res.status(404)
        throw new Error('User not found')
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber

        if (req.body.password) {
          user.password = req.body.password
        }
    
        const updatedUser = await user.save()
    
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } 
    else {
        res.status(404)
        throw new Error('User not found')
    }
});

// @desc    Register a new user
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req,res) =>{
    const users = await User.find({});
    res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);                    // find the user by its id
  
    if (user)                                                           // if user exist if condition becomes true
    {
        await user.remove();                                            // removing user
        res.json({ message: 'User removed' });                          // sending success message
    } 
    else 
    {
        res.status(404);                                                // else user doesn't exist
        throw new Error('User not found');                              // throwing error
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');    // find user by its id except its password
  
    if (user)                                                           // if user exist if condition becomes true 
    {
        res.json(user);                                                 // sending json response
    } 
    else 
    {
        res.status(404);                                                // setting status as 404
        throw new Error('User not found');                              // throwing new error
    }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);                    // find the user by its id
  
    if (user)                                                           // if user exist if condition becomes true
    {
        // admin will update only a particular email,phoneNumber and isAdmin 
        user.name = req.body.name || user.name;  
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.isAdmin = req.body.isAdmin;
  
        const updatedUser = await user.save()
  
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            phoneNumber:updatedUser.phoneNumber,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } 
    else 
    {
        // setting status as 404 and throw a error
        res.status(404)
        throw new Error('User not found')
    }
});

const sendEmail = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    
    const user = await User.findOne({ email });
    if(user)
    {
        const token = generateToken(user._id);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email, // Change to your recipient
            from: 'contact@kalorie.in', // Change to your verified sender
            subject: 'Reset Password',
            text: 'Using the following link you can ',
            html: `<p>Hi ${user.name},</p>
            <br/>
            <p>
            There was a request to change your password!
            <br/>
            </p>
            <br/>
            <p>
            If you did not make this request then please ignore this email.
            </p>
            <br/>
            Otherwise, please click this link to change your password
            
            <span>Otherwise, please click this link to change your password <a href="http://kalorie.in/resetPassword" target="_blank">Reset</a> </span>
            <br/>
            <strong>This is a system generated mail, please do not reply</strong>
            <p>Regards</p>
            <br/>
            <p>KALORIE.in</p>
            `,
        }
        sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({message: "email Sent",user});
        })
        .catch((error) => {
            res.status(400).json({message:'Email not sent'});
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

const resetPassword = asyncHandler(async(req,res) => {
    const user = await User.findById({_id:req.params.id});
    const password = req.body.password;
    if(user)
    {
        user.password=password;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
});

// exporting controllers
module.exports = {
    // normal user controller
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,

    // admin related controller
    getUsers,
    deleteUser,
    getUserById,
    updateUser,

    sendEmail,
    resetPassword,
};