const express = require('express');                              // imported express module for initiating express
const { 
    newSubscription,
    getSubscriptions,
    getMySubscription,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,

} = require('../controllers/subscriptionController');



// importing authentication middleware
const { admin, protect } = require('../middleware/authMiddleware');

const router = require('express').Router();                           // creating express router

router
     .route('/')
     .post(protect,newSubscription)                      // route to create product
     .get(protect,admin,getSubscriptions)

// get user subscription
router
     .route('/mysubscription')
     .get(protect,getMySubscription);

// get subscription by id, update using id and delete by id
router
     .route('/:id')
     .get(protect,getSubscriptionById)
     .delete(protect,deleteSubscription)                    // route to delete subscription by id
     .put(protect,updateSubscription);                      // route to update subscription by id
module.exports = router;