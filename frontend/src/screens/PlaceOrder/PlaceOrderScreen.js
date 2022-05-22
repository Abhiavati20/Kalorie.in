import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Form  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message';
import CheckOut from '../../components/CheckOut/CheckOut'
import { createOrder,payOrder,getOrderDetails } from '../../actions/orderActions';
import axios from 'axios'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import { savePaymentMethod } from '../../actions/cartActions'
import '../../bootstrap.min.css';
import Veg from './veg.png';
import NonVeg from './non-veg.png';
import FormContainer from '../../components/FormContainer/FormContainer';
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from '../../constants/urlConstant';
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost';
const PlaceOrderScreen = () => {
    const [show ,setShow] = useState(false);
    const [couponName ,setCouponName] = useState('');
    const [totalPrice ,setTotalPrice] = useState(0);

    const dispatch = useDispatch()
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const cart = useSelector((state) => state.cart)
    
    const navigate = useNavigate();

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    
    cart.shippingPrice = 19;
    
    cart.taxPrice = 0;
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)
    
    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate
    const displayRazorpay= async() =>{

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

        
        const {data} = await axios.post(
            `${backendUrl}/api/orders/${totalPrice}/razorpay`,
        )
        const options = {
              // "key": process.env.KEY_ID, 
                "key": __DEV__? "rzp_live_RUY9X0qNhOSMYq" : process.env.REACT_APP_KEY_ID,
                "amount": data.amount,
                "currency": data.currency,
                "name": "Kalorie",
                "description": "Test Transaction...",
                "image": "mobile.png",
                "order_id": data.id, 
                "handler": async function (response) {
                    if(response)    
                    {
                        toast.info(`Transaction Successfull!!! Id: ${response.razorpay_payment_id}`)
                        dispatch(
                            createOrder({
                                orderItems: cart.cartItems,
                                shippingAddress: cart.shippingAddress,
                                paymentMethod: paymentMethod,
                                itemsPrice: cart.itemsPrice,
                                shippingPrice: cart.shippingPrice,
                                taxPrice: cart.taxPrice,
                                totalPrice: totalPrice,
                                isPaid : true,
                                paidAt : Date.now(),
                                razorpay_payment_id:response.razorpay_payment_id,
                                razorpay_order_id:response.razorpay_order_id,
                                razorpay_signature:response.razorpay_signature,
                            })
                        )
                        dispatch({type:CART_CLEAR_ITEMS});
                        dispatch(payOrder({orderId: order._id,result:response}));
                        dispatch(getOrderDetails(order._id));
                    }
                    else{
                        toast.warning(`Payment Not Successful`)
                    }
                },
                "prefill": {
                    "name": userInfo.name,
                    "email": userInfo.email,
                    "contact": userInfo.phoneNumber
                },
        };
            let paymentObject = new window.Razorpay(options);
            paymentObject.open();
            dispatch(getOrderDetails(order._id));
    }
    if (!cart.shippingAddress.address) 
    {
        navigate('/shipping')
    } 

    
    
    
    

    useEffect(() => {
        if (success) {
            
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
            navigate(`/order/${order._id}`)
        }
        setTotalPrice(cart.totalPrice);
              
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [navigate, success,dispatch,setTotalPrice,cart.totalPrice])
    const [paymentMethod, setPaymentMethod] = useState("")
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
    }
    const submitHandler1 = async(e) => {
        e.preventDefault()
        const {data} = await axios.get(`${backendUrl}/api/coupons`);
        let filteredData;
        data.map(coupon => {
            if(coupon.couponName.toLowerCase() === couponName.toLowerCase() && coupon.minVal < cart.totalPrice){
                filteredData = coupon;
            }
            return null;
        })
        if(!filteredData){
            toast.info("Coupon Not Available, Please check minimum purchase")
        }
        const arr = filteredData.users;
        let filteredUser;
        arr.map(user=> {
            if(user.name === userInfo.name)
                filteredUser = user;

            return null;
        });
        
        if(!filteredUser){
            const ID = filteredData._id
            const config = {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                },
            }
        
            await axios.post(`${backendUrl}/api/coupons/apply`,{ID},config)
            toast.info('Coupon Applied');
            cart.totalPrice = (cart.totalPrice - cart.totalPrice * filteredData.value).toFixed(2);
            setTotalPrice(cart.totalPrice);
        }
        else{
            toast.info('Coupon already Used');
        }
        
        
    }
    const placeOrderHandler = () => {
        
        if(paymentMethod !== ""){
            toast.info("Order placed successfully ")
            dispatch(
                createOrder({
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: totalPrice,
                })
            )
            dispatch({type:CART_CLEAR_ITEMS});
        }
        else{
            toast.warning("Payment Method Not Selected")
        }
        
    }
    return (
        <div
            className={`${show && 'mb-5 pb-4 bg-light'}`}
            // style={{height:'100v'}}
        >
             <ToastContainer
                        position="top-right"
                        autoClose={5000}

                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
            <FormContainer >
            {!show&&<CheckOut step1 step2  step4 />}
            
                        
                        <ListGroup variant='flush'>
                        <h4 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Summary</h4>
                        <ListGroup.Item >
                        <h5 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem"}}>Order Items</h5>
                            {
                                cart.cartItems.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row className={`d-flex w-100 justify-content-between`}>
                                                    <Col xs={2} md={2}>
                                                        <img
                                                            src={item.isVeg?Veg:NonVeg}
                                                            alt={item.name}
                                                            width="25px"
                                                            height="25px"
                                                            fluid = "true"
                                                            rounded = "true"
                                                        />
                                                    </Col>
                                                    <Col xs={4} className='d-flex flex-column'>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col xs={5}>
                                                    <p style={{fontWeight:'bolder',color:'black'}}>Rs {item.qty * item.price}</p>   
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <Row className={` w-100 justify-content-between`}>
                                                <Col xs={7} md={7}><p style={{fontWeight:'bolder',color:'black'}}>Delivery</p></Col>
                                                <Col><p style={{fontWeight:'bolder',color:'black'}}>Rs {cart.shippingPrice}</p></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            <Row className={`d-flex w-100 justify-content-between`}>
                                                <Col xs={7} md={7}><p style={{fontWeight:'bolder',color:'black'}}>Tax</p></Col>
                                                <Col><p style={{fontWeight:'bolder',color:'black'}}>Rs 0.00</p></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            <Row className={`d-flex w-100 justify-content-between`}>
                                                <Col xs={7} md={7}><p style={{fontWeight:'bolder',color:'black'}}>Total</p></Col>
                                                <Col><p style={{fontWeight:'bolder',color:'black'}}>Rs {totalPrice}</p></Col>
                                            </Row>
                                         </ListGroup.Item>
                                    </ListGroup>
                                )
                            }
                            </ListGroup.Item >
                            <ListGroup.Item>
                                <h5 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem"}}>Shipping Address</h5>
                                    
                                    <Col>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                    {cart.shippingAddress.country},{' '}
                                    {cart.shippingAddress.postalCode}.
                                    </Col>
                                    
                                
                            </ListGroup.Item>

                        <ListGroup.Item>
                            <Form onSubmit={submitHandler} className='w-100 h-25'>
                                <Form.Group>
                                    <Form.Label as='h5' style={{padding:"0.5rem 0.25rem"}}>Payment Method</Form.Label>
                                    <Col>
                                        <Form.Control
                                            as='select'
                                            className='w-100 h-25 custom-select'
                                            onChange={(e) =>setPaymentMethod(e.target.value)}
                                        >
                                            <option value="">
                                                Select a method
                                            </option>
                                            <option  value="Cash On Delivery (COD)">
                                                Cash On Delivery (COD)
                                            </option>
                                            <option  value="Pay Online">
                                                Pay Online
                                            </option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form onSubmit={submitHandler1} className='w-100 h-25'>
                                <Form.Group className='m-1' controlId='password'>
                                    <Form.Label style={{color:'black',fontWeight:'700'}}>Coupon Name</Form.Label>

                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Coupon Name'
                                        value={couponName}
                                        onChange={(e) => setCouponName(e.target.value)}
                                    >
                                                                    
                                    </Form.Control>
                                </Form.Group>
                                <Button
                                    className='rounded my-2'
                                    variant="warning"
                                    type='submit'
                                    size='sm'
                                >
                                    Add Coupon
                                </Button>
                            </Form>
                        </ListGroup.Item>

                        
                        {error && (
                                    <ListGroup.Item>
                                    {error && <Message variant='warning'>{error}</Message>}
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item >
                                    {
                                        paymentMethod === 'Pay Online' ? ( 
                                            <Button
                                                className='btn btn-block rounded my-2'
                                                variant="warning"
                                                disabled={cart.cartItems === 0}
                                                onClick={displayRazorpay}
                                            >
                                                Buy Now
                                            </Button>
                                        ) : (
                                            <Button
                                                className='btn btn-block rounded my-2'
                                                variant="warning"
                                                disabled={cart.cartItems === 0}
                                                onClick={placeOrderHandler}
                                            >
                                                Place Order
                                            </Button>
                                        )
                                    }
                                </ListGroup.Item>
                                
                            </ListGroup>
                    
                
            </FormContainer>
        </div>
    )
}

export default PlaceOrderScreen
