const mongoose =  require('mongoose');                            // imported mongoose module for creating mongoose schemas

// const nutritionSchema = mongoose.Schema(                    // since we need to store array of nutrition info, hence created separate model for that
//     {
//         // name of nutrition
//         name : {
//             type     : String,
//             required : true,
//             default  : '',
//         },

//         //  weight of nutrient present in a product
//         grams : {
//             type     : Number,
//             required : true,
//             default  : 0,
//         }
//     },
//     {
//         // timestamps for every nutrient object we created 
//         timestamps : true,
//     }
// );

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
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
const productSchema = mongoose.Schema(
    {
        // product name
        name : {
            type     : String,
            required : true,
        },

        // product price
        price : {
            type     : Number,
            required : true,
            default  : 0,
        },

        // is the diet food veg or not
        isVeg : {
            type     : Boolean,
            required : true,
            default  : true,
        },

        // Diet calories
        calories : {
            type     : Number,
            required : true,
            default  : 300,                     // an average indian breakfast or lunch meal includes 300 calories 
        }, 

        // product image
        image : {
            type : String,
        },
        category : {
            type     : String,
            default  : '',
        },
        // nutrition information
        nutritionInfo : {
            type     : String,
            default  : '',
        },

        // description of product
        description : {
            type : String,
        },

        // ratings of the product
        rating : {
            type     : Number,
            required : true,
            default  : 0,
        },

        reviews: [reviewSchema],
        // availability of product 
        availability : {
            type     : Number,
            required : true,
            default  : 1,
        },
        isOnline : {
            type     : Boolean,
            required : true,
            default  : true,
        },
    },
    {
        // timestamps for every product we created 
        timestamps : true,
    }
);
const Product = mongoose.model('Product', productSchema);                   // creating product model

module.exports = Product                                                      // export product model