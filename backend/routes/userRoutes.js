const express = require('express');                              // imported express module for initiating express

// importing user controllers
const {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser,
    sendEmail,
    resetPassword,
} =  require('../controllers/userController');

// importing authorization middleware
const { protect, admin } = require('../middleware/authMiddleware');

const router = require('express').Router();                           // creating express router

// register user route
router.route('/')
      .post(registerUser)                                   // registering a user       
      .get(protect, admin, getUsers);                       // getting all user

// login user route
router.post('/login', authUser);                             // logging a user 

// user profile
router.route('/profile')
      .get(protect, getUserProfile)                 // protected route to fetch user profile
      .put(protect, updateUserProfile);             // protected route to update userprofile


// routes for admin
router.route('/:id')
      .delete(protect,admin,deleteUser)             // protected route to delete a user from database
      .get(protect,admin,getUserById)               // protected route to fetch user details
      .put(protect,admin,updateUser);               // protected route to update user

router.route('/sendResetEmailPassword').post(sendEmail);
router.route('/:id/resetPassword').post(resetPassword);
module.exports = router