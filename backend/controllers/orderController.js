const asyncHandler = require('express-async-handler')                        // importing asynchandler middleware to handle exception in async express routes
const Order        = require('../models/orderModel')                    // importing product model for crud and different operation
const Razorpay     = require('razorpay');                                   // importing colors module for colorful console messages
const dotenv       = require('dotenv'); 
const shortid = require('shortid')
const sgMail = require('@sendgrid/mail')
dotenv.config();  
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;                                               // destructuring the information from request body
    if (orderItems && orderItems.length === 0) 
    {   // checking whether there are any products in cart
        // if cart is empty then throw error 
        res.status(400);
        throw new Error('No order items');
    } 
    else 
    {
        // creating a order
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid,
            paidAt,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        });
        
        // saving new order
        const createdOrder = await order.save()
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: [req.user.email,'contact@kalorie.in','kalorie4@gmail.com'],  // Change to your recipient
            from: 'contact@kalorie.in', // Change to your verified sender
            subject: 'Order Placed',
            text: 'Dear Customer,',
            html: `
            <p>
            <strong>Congratulations!<strong>
            Your order has been placed successfully.
            </p>
            <p>Order Number : ${createdOrder._id} .</p>
            <p>Order Items : ${orderItems.map(order=>order.name)}</p>
            <span>Total Price :  ${totalPrice}</span>
            <br/>
            <span>Payment Method : ${paymentMethod}</span>
            <br/>
            <span>Delivery Time: 30 min.
            <br/>Thank you for reaching out KALORIE.in</span>
            <br/>
            <span>For more detailed summary click this link <a href=${`http://kalorie.in/order/${createdOrder._id}`}>LINK</a></span>,
            <br/>
            <span>Dear Customer,</span>
            <br/>
            <p>Thank you for reaching us. We hope you enjoyed your takeaway. We’re grateful for the pleasure of serving you again. Please do share your honest feedback. This would mean a lot to us.</p>
            <br/>
            <a href = 'https://forms.gle/37hCL81RaiizfTmo9'>https://forms.gle/37hCL81RaiizfTmo9</a>
            <p>Regards</p>
            <br/>
            <p>KALORIE.in</p>
            `
        }
        sgMail
        .send(msg)
        .then(() => {
            res.status(201).json(createdOrder)
        })
        .catch((error) => {
            res.status(400).json({message:'Email not sent'});
        })
        // sending created order as response
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    // finding order based on id by populating only user email and name
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    

    if (order)                           
    {
      res.json(order);
    } 
    else 
    {
        //  setting status as 404 and throwing a error 
        res.status(404);
        throw new Error('Order not found');
    }
});


// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // find order by id and update
    const order = await Order.findById(req.params.id)
    
    if (order) 
    {
        // if order is successfully updated then send a json respone
            order.razorpay_payment_id = req.body.razorpay_payment_id;
            order.razorpay_order_id = req.body.razorpay_order_id;
            order.razorpay_signature = req.body.razorpay_signature;
            order.isPaid = true;
            order.paidAt = Date.now();
            const updatedOrder = await order.save()
            res.status(200).json(updatedOrder);
        
    } 
    else 
    {
        // else throw an error
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/deliver
// @access  Private
const updateOrderToDeliver = asyncHandler(async (req, res) => {
    // find order by id and update
    const order = await Order.findById(req.params.id)
    
    if (order) 
    {
        // if order is successfully updated then send a json respone
        order.isPaid = true;
        order.paidAt = order.paidAt ? order.paidAt : Date.now();
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder);
    } 
    else 
    {
        // else throw an error
        res.status(404);
        throw new Error('Order not found');
    }
});
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    // find orders by user id
    const orders = await Order.find({ user: req.user._id })
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    // get all orders and only populate user name and its id
    const orders = await Order.find().sort({createdAt:-1}).populate('user', 'id name phoneNumber');
    res.json(orders)
});

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});


// @desc    Get all orders
// @route   GET /api/orders
// @access  
const payment = asyncHandler(async(req,res)=>{
    const totalprice = req.params.amount;
    const payment_capture = 1;
	const amount = totalprice;
	const currency = 'INR';
    const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}
    try {
		const response = await razorpay.orders.create(options)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
            amount_paid : response.amount_paid,
            amount_due: response.amount_due,
		})
	} catch (error) {
		console.log(error)
	}
});
module.exports = {
    payment,
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliver,
    getMyOrders,
    getOrders,
}
