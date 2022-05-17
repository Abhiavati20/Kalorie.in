const mongoose = require('mongoose');                    // imported mongoose module for creating mongoose schemas
const usersSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);
const couponSchema = mongoose.Schema(
    {
        users : [usersSchema],
        couponName : {
            type     : String,
            required : true
        },
        value :  {
            type     : Number,
            required : true,
            default  : 0.1,
        },
        minVal :  {
            type     : Number,
            required : true,
            default  : 0,
        },
    }
)


const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon;