import React, { useState, useEffect } from 'react'
import {  Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getUserDetails,updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { listMyOrders } from '../../actions/orderActions'
import FormContainer from '../../components/FormContainer/FormContainer'
import '../../bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
    const [show ,setShow] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
          if (!user || !user.name || success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders());
        } else {
            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
          }
        }
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [dispatch, navigate, userInfo, user,success])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(phoneNumber.length !== 10){
            setMessage('Invalid Phone Number, It Must Contain 10 Digits')
        }
        else if (password !== confirmPassword) {
          setMessage('Passwords do not match')
        } else {
          dispatch(updateUserProfile({ id: user._id, name, email,phoneNumber: Number(phoneNumber),password }))
          setPassword('');
          setConfirmPassword('');
          setMessage('')
        }
      }
    return (
        <div
            className={`${show && 'mb-5 pb-4 bg-light'}`}
            style={show?{height:"100vh"}:{marginBottom:'1rem', padding:'2rem'}}
        >
                    
                    {loading ? (
                        <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <FormContainer>
                                {message && <Message variant='danger'>{message}</Message>}
                                {success && <Message variant='success'>Profile Updated</Message>}
                                <h3 style={{textAlign:"left",width:"85%",padding:"1.5rem 0.25rem 1rem 0.25rem",fontSize:"22px"}} >Hello {userInfo.name}!!</h3>
                                <Form onSubmit={submitHandler} className='py-2'>
                                    <Form.Group style={{color:'black',fontWeight:'700'}}controlId='name' className='py-2'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='email' className='py-2'>
                                        <Form.Label style={{color:'black',fontWeight:'700'}}>Email Address</Form.Label>
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

                                    <Form.Group controlId='password' className='py-2'>
                                        <Form.Label style={{color:'black',fontWeight:'700'}}>New Password</Form.Label>
                                        <span className='d-flex align-content-center'>
                                            <Form.Control
                                            type={visible===true?'text':'password'}
                                            placeholder='Enter New password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            >
                                                
                                            </Form.Control>
                                            {
                                                !visible 
                                                ? <FaEyeSlash style={{cursor:"pointer"}} onClick={()=>setVisible(!visible)}/>
                                                : <FaEye style={{cursor:"pointer"}} onClick={()=>setVisible(!visible)}/>
                                                 
                                            }
                                        </span>
                                    </Form.Group>

                                    <Form.Group controlId='confirmPassword' className='my-2'>
                                        <Form.Label style={{color:'black',fontWeight:'700'}}>Confirm New Password</Form.Label>
                                        <span className='d-flex'>
                                            <Form.Control
                                                type={visible1===true?'text':'password'}
                                                placeholder='Confirm New password'
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            ></Form.Control>
                                            {
                                                !visible1 
                                                ? <FaEyeSlash style={{cursor:"pointer"}} onClick={()=>setVisible1(!visible1)}/>
                                                : <FaEye style={{cursor:"pointer"}} onClick={()=>setVisible1(!visible1)}/>
                                                 
                                            }
                                        </span>
                                    </Form.Group>

                                    <Button className = 'my-3 rounded btn-block' type='submit' variant='warning'>
                                        Update
                                    </Button>
                                </Form>
                            </FormContainer>
                        )
                    }
        </div>
    )
}

export default ProfileScreen
