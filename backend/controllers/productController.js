const asyncHandler = require('express-async-handler')                        // importing asynchandler middleware to handle exception in async express routes
const Product      = require("../models/productModel")                    // importing product model for crud and different operation

// @desc    Fetch all products
// @route   GET /api/products?keyword=xyz&pageNumber=1?isVeg=true
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

    
    const isVegOrNot = req.query.isVeg === "true"
    const keyword = req.query.keyword                                   // collecting the keyword to be searched as well as validating it 
        ? {                                                             // if there exit keyword then look for the products which are similar to that keyword
            name: {
                $regex: req.query.keyword,                              // defining the regex
                $options: 'i',                                          // case insensitive
            },
        }
        : {}
    const category = req.query.category                                   // collecting the keyword to be searched as well as validating it 
        ? {                                                             // if there exit keyword then look for the products which are similar to that keyword
            category: {
                $regex: req.query.category,                              // defining the regex
                $options: 'i',                                          // case insensitive
            },
        }
        : {}
    const nutrients = req.query.nutrients                                   // collecting the keyword to be searched as well as validating it 
        ? {                                                             // if there exit keyword then look for the products which are similar to that keyword
            nutritionInfo: {
                $regex: req.query.nutrients,                              // defining the regex
                $options: 'i',                                          // case insensitive
            },
        }
        : {}
    
    const minCalories = +req.query.minCal || 0;
    const maxCalories = +req.query.maxCal || 9999;
    
    const parameter = req.query.isVeg 
        ?
        {
            ...keyword,
        
            ...nutrients,
            isVeg:isVegOrNot,
            calories:{$gte: minCalories, $lte: maxCalories},
            ...category,
        } :  {
            ...keyword, 
            ...nutrients,
            calories:{$gte: minCalories, $lte: maxCalories},
            ...category,
        }

    const products = await Product.find(parameter)              // fetching products based on limit and keyword and some other parameters
    
    res.json({ products});   // then send products as json data as response
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async(req, res) => {
    
    const product = await Product.findById(req.params.id);          // findById function will find product by id and then return the object that has found else return null

    if(product)                                                     // check if object returned or not
    {
        res.json(product);                                          // if found then send a json data as response
    }
    else
    {
        res.status(404);                                            // if not found set response status as 404
        throw new Error("Sorry! Product Not Found :(");             // error message thrown
    }
});

// @desc    Delete a product using its id
// @route   DELETE /api/products/:id
// @access  Currently public   (in future after working on user module it should be protected)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)           // findById function will find product by id and then return the object that has found else return null
  
    if (product)                                                    // check if object returned or not
    {
      await product.remove();                                       // removing the product from collection
      res.json({ message: 'Product removed' });                     // sending successful message
    } 
    else 
    {
      res.status(404);                                              // if not found set response status as 404
      throw new Error('Sorry! Product Not Found :(');               // error message thrown
    }
});

// @desc    Create a product    (a default product will be created which we have to update as per our need)
// @route   POST /api/products
// @access  Currently public    (in future after working on user model it should be protected)
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({                                   // creating a new product object
        name         : 'Sample name',
        price        : 100,
        isVeg        : true,
        calories     : 300,
        image        : '/images/sample.jpeg',
        nutritionInfo: "lowcalorie",
        description  : 'Sample description',
        rating       : 0,
        availability : 2,
        category     : ''

    })
  
    const createdProduct = await product.save()                     // saving that object
    res.status(201).json(createdProduct)                            // on successfull creation set response status as 201 and send created product as json data
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Currently public    (in future after working on user model it should be protected)
const updateProduct = asyncHandler(async(req, res) => {

    // findById function will find product by id and then return the object that has found else return null
    const product = await Product.findByIdAndUpdate(
                        {_id:req.params.id},
                        {
                            $set : req.body
                        }    
                    ); 

    if(product)                                                     // if there is product object then just its values
    {
        res.json(product);                                    // on successfull updation send updated product as json data
    }
    else
    {
        res.status(404);                                              // if not found set response status as 404
        throw new Error('Sorry! Product Not Found :(');               // error message thrown
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) 
    {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
  
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
  
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
  
        product.reviews.push(review)
  
        product.numReviews = product.reviews.length
  
        product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } 
    else 
    {
        res.status(404)
        throw new Error('Product not found')
    }
});

// @desc    top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  
    res.json(products)
});



// exporting all functions which will be used as callback in routes
module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview, 
    getTopProducts,
};