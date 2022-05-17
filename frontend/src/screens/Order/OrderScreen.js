import React, { useState,useEffect,useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { useReactToPrint } from 'react-to-print';

import Veg from './veg.png';
import NonVeg from './non-veg.png';
import {getOrderDetails,deliverOrder} from '../../actions/orderActions'
import '../../bootstrap.min.css';
import FormContainer from '../../components/FormContainer/FormContainer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants'
const OrderScreen = () => {
    const params = useParams();
    const componentRef = useRef();
    const handlePrint1 = useReactToPrint({
        content: () => componentRef.current,
    });
    const {id} = params;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    
    
    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }
    const navigate = useNavigate();
    const [show ,setShow] = useState(false);
    useEffect(() => {
        if (!userInfo) {
          navigate('/login')
        }
        
    
        if (!order || successPay || successDeliver || order._id !== id) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            
            dispatch(getOrderDetails(id))
        } 
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [dispatch, id,successPay, order,navigate,userInfo,successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }
    return (
        
        <div
            className={`${show && 'mb-5 pb-4 bg-light'}`}
            
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
            <FormContainer>
            
            <Button className='btn my-3 mx-3 p-3 shadow-sm border-warning btn-light text-dark' variant='light' size='sm' onClick={handlePrint1}> Print A Receipt </Button>
            <Button className='btn my-3 p-3 shadow-sm border-warning btn-light text-dark' variant='light' size='sm' onClick={() => navigate('/')}>
                Back To Homescreen
            </Button>
            {loadingDeliver && (<Loader />)}
            {loadingPay && (<Loader />)}
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <span id = "print" ref={componentRef} >
                        <ListGroup variant='flush' >
                            <h4 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Summary</h4>
                        <ListGroup.Item >
                            <h5 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem"}}>Order Items</h5>
                            {
                                order.orderItems.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row className={`d-flex w-100 justify-content-between`}>
                                                    <Col xs={2} md={2}>
                                                        <img
                                                            src={item.isVeg?Veg:NonVeg}
                                                            alt={item.isVeg?"veg":"non-veg"}
                                                            width="25px"
                                                            height="25px"
                                                            fluid
                                                            rounded
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
                                            <Row className={`d-flex w-100 justify-content-between`}>
                                                <Col xs={7} md={7}><p style={{fontWeight:'bolder',color:'black'}}>Delivery</p></Col>
                                                <Col><p style={{fontWeight:'bolder',color:'black'}}>Free</p></Col>
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
                                                <Col><p style={{fontWeight:'bolder',color:'black'}}>Rs {order.totalPrice}</p></Col>
                                            </Row>
                                         </ListGroup.Item>
                                    </ListGroup>
                                )
                            }
                            </ListGroup.Item >
                            
                            <ListGroup.Item>
                                
                                        
                                <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",color:'black',fontWeight:'800'}}>Your Information</h5>
                                    <Col>
                                        <p>
                                            <strong>Name{' '}:</strong>{' '}{order.user.name}
                                        </p>
                                        <p>
                                            <strong>Phone Number{' '}:</strong>{' '}{order.user.phoneNumber}
                                        </p>
                                        <p>
                                            <strong>Email{' '}:</strong>{' '}
                                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                        </p>
                                    </Col>
                            </ListGroup.Item>
                                
                            <ListGroup.Item>
                                <h5 style={{textAlign:"left",width:"75%",padding:"0.5rem 0.25rem",color:'black',fontWeight:'800'}}>Shipping Address</h5>
                                    
                                    <Col>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.country},{' '}
                                    {order.shippingAddress.postalCode}.
                                    </Col>
                                    
                                
                            </ListGroup.Item>

                            <ListGroup.Item>
                
                                    <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",color:'black',fontWeight:'800'}}>Payment Method</h5>
                                
                                <Col>
                                    {order.paymentMethod}
                                </Col>
                            </ListGroup.Item>

                        
                        {error && (
                                    <ListGroup.Item>
                                    {error && <Message variant='warning'>{error}</Message>}
                                    </ListGroup.Item>
                                )}
                                {
                                    order.paidAt &&
                                        (<ListGroup.Item>
                                            <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem"}}>Transaction Date</h5>
                                            <Message variant = 'info'>{order.paidAt && `Paid On : ${order.paidAt.substring(0, 10).split("-").reverse().join("/")}`}</Message>
                                            
                                        </ListGroup.Item>)
                                    }
                                <ListGroup.Item>
                                {
                                    (order.paidAt && order.isDelivered) && (
                                        <>
                                            <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem"}}>Delivery Date</h5>
                                            <Message variant='info'>Delivered On : {order?.deliveredAt?.substring(0, 10).split("-").reverse().join("/")}</Message>
                                        </>   
                                        
                                    )
                                }
                                
                                {
                                            userInfo &&
                                            userInfo.isAdmin &&
                                            // order.isPaid &&
                                            !order.isDelivered && (
                                                
                                                    <Button
                                                        type='button'
                                                        className='btn btn-block rounded'
                                                        onClick={deliverHandler}
                                                        variant = 'warning'
                                                    >
                                                        Mark As Delivered
                                                    </Button>
                    
                                            ) 
                                }
                                </ListGroup.Item>
                            </ListGroup>
                    </span>
                )   
            }
            </FormContainer>
        </div>
    )
}
export default OrderScreen;
