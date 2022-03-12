import React, { useState,useEffect } from 'react'
import { useLocation }                      from 'react-router-dom'
import { Form, Button, Container }    from 'react-bootstrap'
import {  useSelector }  from 'react-redux'
import { useNavigate }               from 'react-router-dom';
import Message                       from '../../components/Message/Message';
import Loader                        from '../../components/Loader/Loader';
import FormContainer                 from '../../components/FormContainer/FormContainer';
import '../../bootstrap.min.css';
import axios from 'axios';
import { backendUrl } from '../../constants/urlConstant';
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error,userInfo } = userLogin
    const [show ,setShow] = useState(false);
    const redirect = location.search ? location.search.split('=')[1] : ''
    useEffect(() => {
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [ userInfo, navigate,redirect])

    const submitHandler = async(e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(`${backendUrl}/api/users/sendResetEmailPassword`,{email},config);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        setMsg('Email Sent');
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
        <h4 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Login</h4>
          {msg && <Message>{msg}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='mt-2'>
              <Form.Label style={{color:'black',fontWeight:'700'}}>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='enter registered email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' className='btn-block rounded my-3' variant='warning'>
              Send Email
            </Button>
          </Form>

        </FormContainer>
        </Container>
    );
}

export default LoginScreen
