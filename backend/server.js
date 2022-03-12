const express       = require('express');                                  // importing express module for express application
const morgan       = require('morgan');                                  // importing express module for express application
const colors        = require('colors');                                   // importing colors module for colorful console messages
const dotenv        = require('dotenv');                                   // importing dotenv module for loading env variables into process.env
const connectDB    = require('./config/db');                           // importing connectDb function from db.js  
// importing routes
const productRoutes = require('./routes/productRoutes');                // product routes
const userRoutes    = require('./routes/userRoutes');                   // user routes
const orderRoutes  = require('./routes/orderRoutes');                   // user routes
const uploadRoutes  = require('./routes/uploadRoutes');                 // upload routes;
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const couponRoutes = require('./routes/couponRoutes')
const path          = require('path');
const crypto        = require('crypto')
// const Order = require('')
// importing error modules
const { notFound,
    errorHandler } = require('./middleware/errorMiddleware')

dotenv.config();                                                      // configuring env variables

connectDB();                                                          // invoking connectdb function to make connection to database

const app = express();                                                // initializing express app

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const cors = require('cors');

app.use(cors());
  

// mounting the express.json() middleware
app.use(express.json());                                              // inorder to recognize the incoming request object as a JSON object
// product route
app.use('/api/products',productRoutes);                               // created product routes

// user routes
app.use('/api/users', userRoutes);                                    // created user routes

// order routes
app.use('/api/orders', orderRoutes);                                  // created order routes   

app.use('/api/upload', uploadRoutes);                                 // image upload route

app.use('/api/subscription',subscriptionRoutes);                      // subscription route
app.use('/api/coupons',couponRoutes);                      // coupon route

app.post('/verification',(req,res) => {
    // payment validation
    const SECRET = '12345678'


	const shasum = crypto.createHmac('sha256', SECRET)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	// console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		// process it
		res.json({status:'200',message: "payment successfull"});
        
	} else {
		// pass it
        res.json({status:'502',message: "payment unsuccessfull"});
    }
})


// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.get('/', (req, res) => {
    res.send('API is running....')
})



app.use(notFound);                                                    // using not found middle ware
app.use(errorHandler);                                                // using error handler middle ware

const PORT = process.env.PORT || 5000;                                // defining the port

// bind and listening the connection on the port 
app.listen(
    PORT,                                                             // port on which connection will be bind                                          
    console.log(`Server Running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold)  // console message
);

// after running the application/server visit http://localhost:5000/
