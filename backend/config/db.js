const mongoose = require("mongoose");                                    // importing mongoose module for database connection


// connecting to database 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI, 
      // "mongodb+srv://abhi1234:abhi1234@cluster0.alczb.mongodb.net/KnockOnce?retryWrites=true&w=majority",  
    {
      useUnifiedTopology: true,                                     // constantly checking the status of connection
      useNewUrlParser: true,                                        // inorder to fallback to old parser
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
}

module.exports = connectDB;                       // export the connectDB function