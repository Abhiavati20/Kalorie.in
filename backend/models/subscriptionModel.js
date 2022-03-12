const mongoose = require('mongoose');                    // imported mongoose module for creating mongoose schemas
const subscriptionSchema = mongoose.Schema(
    {
        // storing reference of user
        user : {
            type     : mongoose.Schema.Types.ObjectId,
            required : true,
            ref      : 'User',
        },
        
        // user goals like losing weight/ gaining muscles/ healthy eating
        goal : {
            type : String, 
            required : true,
            default : "Healthy Eating"
        },

        userGender :{
            type : String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
            default: 0,
        },

        weight: {
            type: Number,
            required: true,
            default: 0,
        },

        // in cms only
        height: {
            type: Number,
            required: true,
            default: 0,
        },

        bmi: {
            type: Number,
            default: 0.0,
        },

        // in minutes only
        dailyActivity : {
            type : Number, 
            required : true,
            default : 30
        },

        mealType : {
            type : String, 
            required : true,
            default : "Vegetarian"
        },

        dietType : {
            type : String, 
            required : true,
            default : "Vegan"
        },

        noOfDays: {
            type: Number,
            required: true,
            default: 7,
        },

        shippingAddress : {
            address    : { type : String, required : true, default:"" },
            city       : { type : String, required : true, default:"" },
            postalCode : { type : String, required : true, default:"" },
            country    : { type : String, required : true, default:""},
        },

        startDate : {
            type:Date,
        },
        endDate : {
            type:Date,
        },
        paymentMethod : {
            type     : String,
        },

        // payment result after completetion of purchase
        paymentResult : {
            id            : { type: String },
            status        : { type: String },
            update_time   : { type: String },
            email_address : { type: String },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        //   Shipping price 
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        
        //   total price of all items present in cart
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    {
        timestamps : true
    }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription;