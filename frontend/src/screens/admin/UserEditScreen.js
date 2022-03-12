import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'
import { getUserDetails,updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import '../../bootstrap.min.css';
const UserEditScreen = () => {

    const params = useParams();
    const { id : userId } = params;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const navigate = useNavigate();
    
    useEffect(() => {
        if (successUpdate) 
        {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } 
        else 
        {
            if (!user.name || user._id !== userId) 
            {
                dispatch(getUserDetails(userId))
            } 
            else 
            {
                setName(user.name)
                setEmail(user.email)
                setPhoneNumber(user.phoneNumber)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, userId, user, successUpdate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email,phoneNumber,isAdmin }))
    }

    return (
        <Container>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email' className='my-3'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='number' className='py-2'>
                                        <Form.Label style={{color:'black',fontWeight:'700'}}>Phone Number</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter phone number'
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                            <Form.Group controlId='isadmin' className='my-3'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='warning' className='my-3'>
                                Update
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>
        </Container>
    )
}

export default UserEditScreen
