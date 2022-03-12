import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import {getSubscriptionDetails} from '../../actions/subscriptionActions'
import '../../bootstrap.min.css';
const OrderScreen = () => {
    const params = useParams();
    const {id} = params;
    
    const dispatch = useDispatch();

    const subscriptionDetails = useSelector((state) => state.subscriptionDetails)
    const { subscription, loading, error } = subscriptionDetails
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
          navigate('/login')
        }
        
    
        if (!subscription || subscription._id !== id) {
            dispatch(getSubscriptionDetails(id))
        } 
    }, [dispatch, id, subscription,navigate,userInfo])

    
    return (
        <Container
            style={{
                background:'white', 
                borderRadius:"15px",
                padding:'0.25rem', 
                boxShadow:"0px 5px 5px 0px rgba(0,0,0,0.5)"
            }}
        >
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <h5 className='m-3'>Subscription Id : {subscription._id}</h5>
                        <Row>
                            <Col md = {8}>
                                <ListGroup >
                                    <ListGroup.Item>
                                        <h5>Shipping</h5>
                                        
                                        <p>
                                            <strong>Address:</strong>
                                            {subscription.shippingAddress.address}, {subscription.shippingAddress.city}{' '}
                                            {subscription.shippingAddress.postalCode},{' '}
                                            {subscription.shippingAddress.country}
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
                                                        {subscription.userGender}.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >Age : </strong>
                                                        {subscription.age}.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >Weight : </strong>
                                                        {subscription.weight} kg.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >Height : </strong>
                                                        {subscription.height.toFixed(2)} m.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >BMI : </strong>
                                                        {subscription.bmi} kg/m<sup>2</sup>.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >Daily Exercise : </strong>
                                                        {subscription.dailyActivity} mins.
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
                                                        {subscription.mealType}.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >Diet Type : </strong>
                                                        {subscription.dietType}.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >No Of Days : </strong>
                                                        {subscription.noOfDays} days.
                                                    </p>
                                                    <p>
                                                        <strong style={{color:"#146614"}} >Start Date : </strong>
                                                        {subscription.startDate.substring(0, 10).split("-").reverse().join("-")}.
                                                    </p>
                                                    <p >
                                                        <strong style={{color:"#146614"}} >End Date : </strong>
                                                        {subscription.endDate.substring(0, 10).split("-").reverse().join("-")}. 
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
                                                <Col>Rs {subscription.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>Rs {subscription.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>Rs {subscription.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total</Col>
                                                <Col>Rs {subscription.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>    
                    </>
                )   
            }
        </Container>
    )
}

export default OrderScreen;
