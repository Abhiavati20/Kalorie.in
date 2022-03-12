const express =  require('express');                              // imported express module for initiating express
const asyncHandler = require('express-async-handler');
// importing order controllers
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliver,
    getMyOrders,
    getOrders,
    payment,
} = require('../controllers/orderController');

// importing authentication middleware
const { admin, protect } = require('../middleware/authMiddleware');

const router = require('express').Router();                           // creating express router

router
      .route('/')
      .post(protect, addOrderItems)                       // post request for user to add order items 
      .get(protect, admin, getOrders);                    // get request to collect all orders for admin

router.route('/myorders').get(protect, getMyOrders);      // get request for authenticated user to collect his order history list

router.route('/:id').get(protect, getOrderById);          // get request for collecting info about a particular order using its id

router.route('/:id/payment').put(protect,updateOrderToPaid)  // put request for authenticated user to pay his order
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliver)
router.route('/:amount/razorpay').post(payment)
module.exports = router;