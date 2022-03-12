import React, { useState, useEffect } from 'react'
import { Link, useLocation }                       from 'react-router-dom'
import { useDispatch, useSelector }   from 'react-redux';
import { Form, Button, Row, Col, Container}     from 'react-bootstrap';
import { useNavigate }                from 'react-router-dom';
import Message                        from '../../components/Message/Message';
import Loader                         from '../../components/Loader/Loader';
import FormContainer                  from '../../components/FormContainer/FormContainer';
import { register }                   from '../../actions/userActions';
import { FaEye, FaEyeSlash }          from 'react-icons/fa'
import '../../bootstrap.min.css';
const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error} = userRegister;
    const [show ,setShow] = useState(false);
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : ''
    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`);
        }
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [ userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(phoneNumber.length !== 10){
            setMessage('Invalid Phone Number!! It Must Contain 10 Digits')
        }
        else if (password !== confirmPassword) 
        {
            setMessage('Passwords do not match')
        } 
        else 
        {
            dispatch(register(name, email, Number(phoneNumber), password))
        }
    }

    return (
        <Container 
        className='p-lg-5' 
        style={show?{
            height: '100vh',
            width: '100vw',
            display:'flex',
            justifyContent:'center',
            background: 'white',
        }:null} 
        >
        <FormContainer>
        <h4 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Register</h4>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>Already Registered!!</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className>
                <Form.Group controlId='name' className='mt-2'>
                    <Form.Label style={{color:'black',fontWeight:'700'}}>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='John Doe'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='mt-2'>
                    <Form.Label style={{color:'black',fontWeight:'700'}}>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder= 'john@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone' className='mt-2'>
                    <Form.Label style={{color:'black',fontWeight:'700'}}>Phone Number</Form.Label>
                    <Form.Control
                        type='phone'
                        placeholder='9244665406'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='mt-2'>
                    <Form.Label style={{color:'black',fontWeight:'700'}}>Password</Form.Label>
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

                <Form.Group controlId='confirmPassword' className='mt-2'>
                    <Form.Label style={{color:'black',fontWeight:'700'}}>Confirm Password</Form.Label>
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

                <Button type='submit' variant='warning' className='btn-block rounded my-3' style={{fontWeight:'900'}}>
                    Register
                </Button>
            </Form>

            <Row className='py-2 mb-3'>
                <Col>
                Have an Account?{' '}
                <Link to='/login'>
                    Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
        </Container>
    )
}

export default RegisterScreen
