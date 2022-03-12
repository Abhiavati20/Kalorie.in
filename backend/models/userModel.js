const mongoose = require('mongoose');                    // imported mongoose module for creating mongoose schemas
const bcrypt  = require('bcryptjs');                    // imported bcrypt module to hash password

// defining user schema 
const userSchema = mongoose.Schema(
    {
        // user name
        name : {
            type     : String,
            required : true
        },

        // user mobile number
        phoneNumber : {
            type   : Number,  
            unique : true,
        },

        // user email
        email: {
            type     : String,
            required : true,
            unique   : true,
        },

        // user password
        password : {
            type     : String,
            required : true
        },

        // is user an admin
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },

    },
    {
        timestamps:true,
    }
);

// method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);                    // returns boolean value after comparison
}

// before saving the user object we need to hash its password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))                                                // checking the password modified or not
    {
        next();
    }
    const salt = await bcrypt.genSalt(10);                                          // generates a random text salt for use
    this.password = await bcrypt.hash(this.password, salt);                         // hashing the password
});


const User = mongoose.model('User', userSchema);                                    // creating user model

module.exports = User;                                                                // exporting user model

