const asyncHandler = require('express-async-handler')                        // importing asynchandler middleware to handle exception in async express routes
const Subscription = require('../models/subscriptionModel')

// @desc    Create a product   
// @route   POST /api/products
// @access  protected (logged/register users only)
const newSubscription = asyncHandler(async (req, res) => {
    const {
        goal,
        userGender,
        age,
        weight,
        height,
        bmi,
        dailyActivity,
        mealType,
        dietType,
        noOfDays,
        shippingAddress,
        startDate,
        endDate,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    const subscription = new Subscription({                                   // creating a new product object
        user : req.user._id,
        goal,
        userGender,
        age,
        weight,
        height,
        bmi,
        dailyActivity,
        mealType,
        dietType,
        noOfDays,
        shippingAddress,
        startDate,
        endDate,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })
  
    const createdSubscription = await subscription.save()                     // saving that object
    res.status(201).json(createdSubscription)                            // on successfull creation set response status as 201 and send created product as json data
});


// @desc    Get all orders
// @route   GET /api/subscription
// @access  Private/Admin
const getSubscriptions = asyncHandler(async (req, res) => {
    // get all orders and only populate user name and its id
    const subscriptions = await Subscription.find({}).populate('user', 'id name phoneNumber')
    res.status(201)
    res.json(subscriptions)
});


// @desc    Get logged in user orders
// @route   GET /api/subscription/mysubscription
// @access  Private
const getMySubscription = asyncHandler(async (req, res) => {
    // find orders by user id
    const subscription = await Subscription.find({ user: req.user._id })
    res.json(subscription);
});

// @desc    Get order by ID
// @route   GET /api/subscription/:id
// @access  Private
const getSubscriptionById = asyncHandler(async (req, res) => {
    // finding order based on id by populating only user email and name
    const subscription = await Subscription.findById(req.params.id).populate(
      'user',
      'name email phoneNumber'
    );
    

    if (subscription)                           
    {
        res.status(201)
      res.json(subscription);
    } 
    else 
    {
        //  setting status as 404 and throwing a error 
        res.status(404);
        throw new Error('subscription not found');
    }
});

// @desc    Update a product
// @route   PUT /api/subscription/:id
// @access  protected
const updateSubscription = asyncHandler(async(req, res) => {

    // findById function will find product by id and then return the object that has found else return null
    const subscription = await Subscription.findByIdAndUpdate(
                        {_id:req.params.id},
                        {
                            $set : req.body
                        }    
                    ); 

    if(subscription)                                                     // if there is product object then just its values
    {
        res.status(201);
        res.json(subscription);                                    // on successfull updation send updated product as json data
    }
    else
    {
        res.status(404);                                              // if not found set response status as 404
        throw new Error('Sorry! subscription Not Found :(');               // error message thrown
    }
});

// @desc    Delete a product using its id
// @route   DELETE /api/subscription/:id
// @access  protected
const deleteSubscription = asyncHandler(async (req, res) => {
    const subscription = await Subscription.findById(req.params.id)           // findById function will find product by id and then return the object that has found else return null
  
    if (subscription)                                                    // check if object returned or not
    {
      await subscription.remove();                                       // removing the product from collection
      res.status(201).json({ message: 'subscription removed' });                     // sending successful message
    } 
    else 
    {
      res.status(404);                                              // if not found set response status as 404
      throw new Error('Sorry! subscription Not Found :(');               // error message thrown
    }
});

module.exports = {
    newSubscription,
    getSubscriptions,
    getMySubscription,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription
};