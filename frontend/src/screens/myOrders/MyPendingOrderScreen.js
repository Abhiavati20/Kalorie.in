import React, {  useEffect, useState } from 'react'
import { Table,  Button, Row,Card,ListGroup, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { listMyOrders } from '../../actions/orderActions'
import { useNavigate }                from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../../bootstrap.min.css';
import { listMySubscription } from '../../actions/subscriptionActions'
const MyOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [show ,setShow] = useState();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
    
    // const subscriptionListMy = useSelector((state) => state.subscriptionListMy)
    // const { loading: loadingSubscription, error: errorSubscription, subscriptions } = subscriptionListMy;

    useEffect(() => {
        if (!userInfo) {
          navigate('/login')
        } else {
            dispatch(listMyOrders());
            dispatch(listMySubscription());
        }
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [dispatch, navigate, userInfo,])
    return (
        <Container
            className={`${show && 'mb-5 pb-4 bg-light'} h-100`}
            style={show?{height:"100vh",background:'white'}:{marginBottom:'1rem'}}
        >
                <Row className='w-50 justify-content-center mx-auto'>
                <Link className='my-1 mx-2  p-2 rounded btn btn-light shadow-sm'  style={{textTransform:'capitalize'}} variant='warning' to ='/orders'>
                    My Orders
                </Link>
                <Link className='my-1 mx-2  p-2 rounded btn btn-light shadow-sm' style={{textTransform:'capitalize'}} variant='warning' to ='/pendingOrders'>
                    My Pending Orders
                </Link>
                </Row>
                <h3 style={{ textAlign:'center',padding:"0.5rem 0.25rem",fontSize:"22px"}} >My Orders</h3>
                    
                    {
                        loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message variant='danger'>{errorOrders}</Message>
                        ) : orders && orders.length === 0 ? (
                            <Message variant='info'>No Orders Yet!!</Message>
                        ) : (
                            show ? (
                                orders.map((order) => order.isPaid && (
                                    <Card style={{ width: '18rem',margin:"0.5rem auto",padding:"0rem 1rem" }}>
                                        <Card.Header>{order.orderItems[0].name}...</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className='d-flex justify-content-between'>
                                               <p style={{opacity:"0.8"}}>{order.isPaid ? `Paid On : ${order?.paidAt?.substring(0, 10).split("-").reverse().join("/")}` : 'NOT PAID YET!!'}</p>
                                               <p>Rs {order.totalPrice}</p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className='d-flex justify-content-end'>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button size="sm" className='rounded' variant="warning">Details</Button>
                                                </LinkContainer>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                ))
                            ) :(
                                <Table width={50} striped bordered hover responsive >
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Delivered</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order) => !order.isPaid &&(
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt.substring(0, 10).split("-").reverse().join("-")}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>
                                                        {   !order.isPaid && (
                                                               <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        {order.isDelivered ? (
                                                        order.deliveredAt.substring(0, 10).split("-").reverse().join("/")
                                                        ) : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <LinkContainer to={`/order/${order._id}`}>
                                                        <Button className='btn-sm' variant='light'>
                                                            Details
                                                        </Button>
                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            )
                        )
                    }
                {/* <Col md={12}>
                    <Card.Header style={{margin:"1rem 0"}} >
                        <h3 style={show ? {margin:'1rem auto',textAlign:'left'}:null}>My Subscriptions</h3>
                    </Card.Header>
                    {
                        loadingSubscription ? (
                            <Loader />
                        ) : errorSubscription ? (
                            <Message variant='danger'>{errorOrders}</Message>
                        ) : (
                            show ? ( 
                                subscriptions.map((subscription) => (
                                    <Card style={{ width: '18rem',margin:"0.5rem auto",padding:"0rem 1rem" }}>
                                        <Card.Header>{subscription.goal}</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className='d-flex justify-content-between'>
                                               <p style={{opacity:"0.8"}}>{subscription.startDate.substring(0, 10).split("-").reverse().join("-")}</p>
                                               <p>Rs {subscription.totalPrice}</p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className='d-flex justify-content-end'>
                                                <LinkContainer to={`/subscription/${subscription._id}`}>
                                                    <Button size="sm" className='rounded' variant="warning">Details</Button>
                                                </LinkContainer>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                )) 
                            ) :(
                            <Table striped bordered hover responsive className=''>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Goal</th>
                                        <th>Diet Type</th>
                                        <th>Start Date</th>
                                        <th>No of Days</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subscriptions.map((subscription) => (
                                            <tr key={subscription._id}>
                                                <td>{subscription._id}</td>
                                                <td>
                                                    {subscription.goal}
                                                </td>
                                                <td>
                                                    {subscription.dietType}
                                                </td>
                                                <td>{subscription.startDate.substring(0, 10)}</td>
                                                <td>
                                                    {subscription.noOfDays}
                                                </td>
                                                <td>{subscription.totalPrice}</td>
                                               
                                                
                                                
                                                
                                                <td>
                                                    <LinkContainer to={`/subscription/${subscription._id}`}>
                                                        <Button className='btn-sm' variant='light'>
                                                            Details
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>)
                        )
                    }
                </Col> */}
        </Container>
    )
}

export default MyOrderScreen
