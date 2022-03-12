const express =  require('express');                              // imported express module for initiating express
const asyncHandler = require('express-async-handler');
const {
    newCoupon, getCoupons,getCouponById,deleteCoupon,updateCoupon, userAppliedCoupon
} = require('../controllers/couponController')

const { admin, protect } = require('../middleware/authMiddleware');

const router = require('express').Router();  

router
     .route('/')
     .post(newCoupon)                      // route to create product
     .get(getCoupons);                                      // route to get all products    

router
     .route('/:id')                                          // route   
     .get(getCouponById)                                    // route to get product by id
     .delete(deleteCoupon)                    // route to delete product by id
     .put(updateCoupon);                      // route to update product by id

router.route ('/apply').post(protect, userAppliedCoupon)
module.exports = router;