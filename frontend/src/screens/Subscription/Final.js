import React from "react";
import { Button, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message';
import { Link } from 'react-router-dom'
import '../../bootstrap.min.css';
import { newSubscription } from "../../actions/subscriptionActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Final = ({ values,prevStep }) => {
    const dispatch = useDispatch()
    //destructuring the object from values
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    
    values.itemsPrice = (values.noOfDays * 120).toFixed(2);
    values.shippingPrice = addDecimals(values.noOfDays > 7 ? 0 : 100)
    values.taxPrice = addDecimals(Number((0.05 * values.itemsPrice).toFixed(2)))
    values.totalPrice = (
        Number(values.itemsPrice) +
        Number(values.shippingPrice) +
        Number(values.taxPrice)
    ).toFixed(2)
    
    const newSubscriptiona = useSelector((state) => state.newSubscription)
    const {  error } = newSubscriptiona
    const placeOrderHandler = () =>{
        dispatch(newSubscription({...values}));
        toast.warning("Thank You For Subscription! Our Team will connect with you :D");
    }
  
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Button variant="light" className='my-2 mx-auto' onClick={prevStep}>
                Go Back
            </Button>
            <Row className='m-5'>
                
                <Col md={8}>
                    
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>Shipping</h5>
                            <p>
                                <strong>Address : </strong>
                                {values.shippingAddress.address}, {values.shippingAddress.city}{' '}
                                {values.shippingAddress.postalCode},{' '}
                                {values.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Subscription Summary</h5>

                            
                            <ListGroup.Item className='my-2'>
                                <h6 >Personal Information</h6>
                                <Row className='my-1'>
                                    <Col>
                                        <p>
                                            <strong style={{color:"#146614"}} >Name : </strong> 
                                            <Link to={`/profile`}>
                                                {userInfo.name}.
                                            </Link>
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}}>Email : </strong>
                                            {userInfo.email}.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Phone number : </strong>
                                            {userInfo.phoneNumber}.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Gender : </strong>
                                            {values.userGender}.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Age : </strong>
                                            {values.age}.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Weight : </strong>
                                            {values.weight} kg.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Height : </strong>
                                            {values.height} m.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >BMI : </strong>
                                            {values.bmi} kg/m<sup>2</sup>.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Daily Exercise : </strong>
                                            {values.dailyActivity} mins.
                                        </p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item  className='my-2'>
                                <h6> Diet Plan</h6>
                                <Row className='my-1'>
                                    <Col>
                                        
                                        <p>
                                            <strong style={{color:"#146614"}} >Meal Type : </strong>
                                            {values.mealType}.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Diet Type : </strong>
                                            {values.dietType}.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >No Of Days : </strong>
                                            {values.noOfDays} days.
                                        </p>
                                        <p>
                                            <strong style={{color:"#146614"}} >Start Date : </strong>
                                            {values.startDate}.
                                        </p>
                                        <p >
                                            <strong style={{color:"#146614"}} >End Date : </strong>
                                            {values.endDate} 
                                        </p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                                
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h5>Final Pricing Summary</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rs {values.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs {values.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs {values.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs {values.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    variant="warning"
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Final;