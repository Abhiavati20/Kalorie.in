const express = require("express");                              // imported express module for initiating express
// importing product controllers 
const {
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    createProductReview,
    getTopProducts,
} = require("../controllers/productController");

// importing autentication middle ware
const { admin,protect } = require('../middleware/authMiddleware')

const router = require('express').Router();                           // creating express router
            
// create product route
router
     .route('/')
     .post(protect,admin,createProduct)                      // route to create product
     .get(getProducts);                                      // route to get all products    

router.route ('/:id/reviews').post(protect, createProductReview)

router
     .route('/:id')                                          // route   
     .get(getProductById)                                    // route to get product by id
     .delete(protect,admin,deleteProduct)                    // route to delete product by id
     .put(protect,admin,updateProduct);                      // route to update product by id

router.get('/1/top', getTopProducts)

module.exports = router;                                       // exporting router object