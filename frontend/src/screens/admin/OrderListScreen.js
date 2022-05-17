import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { listOrders } from '../../actions/orderActions'
import { useNavigate } from 'react-router'
import '../../bootstrap.min.css';
const OrderListScreen = () => {

    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) 
        {
            dispatch(listOrders())
            setInterval(()=>{
                dispatch(listOrders())
            },600000)
        } 
        else 
        {
            navigate('/login')
        }
        console.log(orders)
    }, [dispatch, navigate, userInfo])

    return (
        <Container>
            <h1>Orders</h1>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>PHONE NUMBER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.user && order.user.phoneNumber}</td>
                                        <td>{order.createdAt.substring(0, 10).split("-").reverse().join("/")}</td>
                                        <td>Rs {order.totalPrice}</td>
                                        <td>
                                            {
                                                order.isPaid ? (
                                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.isDelivered ? (
                                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='warning'>
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
            }
        </Container>
    )
}

export default OrderListScreen
