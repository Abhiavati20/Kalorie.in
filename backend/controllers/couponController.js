const asyncHandler = require('express-async-handler');                        // importing asynchandler middleware to handle exception in async express routes
const Coupon = require('../models/couponModel')

// @desc    Create a product   
// @route   POST /api/coupons
// @access  protected (logged/register users only)
const newCoupon = asyncHandler(async(req,res) => {
    const {couponName,value} = req.body;
    const coupon = new Coupon({                                   // creating a new product object
        couponName,
        value,
    })
  
    const createdCoupon = await coupon.save()                     // saving that object
    res.status(201).json(createdCoupon);
});

// @desc    Get all orders
// @route   GET /api/coupons
// @access  
const getCoupons = asyncHandler(async (req, res) => {
    // get all orders and only populate user name and its id
    const coupons = await Coupon.find({});
    res.json(coupons)
});

// @desc    Fetch single product
// @route   GET /api/coupon/:id
// @access  Public
const getCouponById = asyncHandler(async(req, res) => {
    
    const coupon = await Coupon.findById(req.params.id);          // findById function will find product by id and then return the object that has found else return null

    if(coupon)                                                     // check if object returned or not
    {
        res.json(coupon);                                          // if found then send a json data as response
    }
    else
    {
        res.status(404);                                            // if not found set response status as 404
        throw new Error("Sorry! coupon Not Found :(");             // error message thrown
    }
});

// @desc    Delete a product using its id
// @route   DELETE /api/coupon/:id
// @access  Currently public   (in future after working on user module it should be protected)
const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id)           // findById function will find product by id and then return the object that has found else return null
  
    if (coupon)                                                    // check if object returned or not
    {
      await coupon.remove();                                       // removing the product from collection
      res.json({ message: 'coupon removed' });                     // sending successful message
    } 
    else 
    {
      res.status(404);                                              // if not found set response status as 404
      throw new Error('Sorry! coupon Not Found :(');               // error message thrown
    }
});
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Currently public    (in future after working on user model it should be protected)
const updateCoupon = asyncHandler(async(req, res) => {

    // findById function will find product by id and then return the object that has found else return null
    const coupon = await Coupon.findByIdAndUpdate(
                        {_id:req.params.id},
                        {
                            $set : req.body
                        }    
                    ); 

    if(coupon)                                                     // if there is product object then just its values
    {
        res.json(coupon);                                    // on successfull updation send updated product as json data
    }
    else
    {
        res.status(404);                                              // if not found set response status as 404
        throw new Error('Sorry! coupon Not Found :(');               // error message thrown
    }
});


// @desc    Create new review
// @route   POST /api/coupon/:id/apply
// @access  Private
const userAppliedCoupon = asyncHandler(async (req, res) => {
    const {ID} = req.body;
    const coupon = await Coupon.findById({_id:ID});
    const alreadyReviewed = coupon.users.find(
        (r) => r.user.toString() === req.user._id.toString()
    )
    if(!alreadyReviewed && coupon){
        const user = {
            name:req.user.name,
            user: req.user._id,
        }
        coupon.users.push(user);
        await coupon.save()
        res.status(201).json(coupon);
    }
    else 
    {
        res.status(404)
        throw new Error('Coupon not applied')
    }
});
module.exports={
    newCoupon,
    getCoupons,
    getCouponById,
    deleteCoupon,
    updateCoupon,
    userAppliedCoupon,
}