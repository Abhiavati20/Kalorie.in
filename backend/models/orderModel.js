const mongoose = require('mongoose');                            // imported mongoose module for creating mongoose schemas

// creating order schema
const orderSchema = mongoose.Schema(
    {
        // storing reference of user
        user : {
            type     : mongoose.Schema.Types.ObjectId,
            required : true,
            ref      : 'User',
        },
        
        // users ordered produts array
        orderItems : [
            {
                name    : { type : String, required : true },
                qty     : { type : Number, required : true },
                image   : { type : String, },
                isVeg   : {type : Boolean,},
                price   : { type : Number, required : true },
                product : {
                    type     : mongoose.Schema.Types.ObjectId,
                    required : true,
                    ref      : 'Product',
                },
            },
        ],
        
        // shipping address of a user
        shippingAddress : {
            address    : { type : String, required : true },
            city       : { type : String, required : true },
            postalCode : { type : String, required : true },
            country    : { type : String,},
        },

        // payment method of a user
        paymentMethod : {
            type     : String,
            required : true,
        },

        // payment result after completetion of purchase
        

        // tax price applicable on 
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
        
        // status of payment
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        razorpay_payment_id:{
            type:String,
        },
        razorpay_order_id:{
            type:String
        },
        razorpay_signature:{
            type:String,
        },
        // paid on date
        paidAt: {
            type: Date,
        },
        
        // status of delivery
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        
        // Delivered date 
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps : true
    }
);

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;