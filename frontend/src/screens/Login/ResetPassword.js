import React, { useState,useEffect } from 'react'
import {  useLocation }                      from 'react-router-dom'
import { Form, Button,Container }    from 'react-bootstrap'
import {  useSelector }  from 'react-redux'
import { useNavigate }               from 'react-router-dom';
import Message                       from '../../components/Message/Message';
import Loader                        from '../../components/Loader/Loader';
import FormContainer                 from '../../components/FormContainer/FormContainer';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import '../../bootstrap.min.css';
import { backendUrl } from '../../constants/urlConstant';
const LoginScreen = () => {
    const [password, setPassword] = useState('')
    const [Cpassword, setCPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [visible, setVisible] = useState(false)

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
        if(password === Cpassword)
        {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(`${backendUrl}/api/users/${userInfo._id}/resetPassword`,{password},config); 
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/login');

        }
        else{
            setMsg("passwords don't match")
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
        <h4 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Reset Your Password</h4>
          {msg && <Message variant='danger'>{msg}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mt-2' controlId='password'>
              <Form.Label style={{color:'black',fontWeight:'700'}}>New Password</Form.Label>
              <span className='d-flex align-content-center'>
              <Form.Control
                type='password'
                placeholder='new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              {
                  !visible 
                  ? <FaEyeSlash style={{cursor:"pointer"}} onClick={()=>setVisible(!visible)}/>
                  : <FaEye style={{cursor:"pointer"}} onClick={()=>setVisible(!visible)}/>     
              }
              </span>
            </Form.Group>

            <Form.Group className='mt-2' controlId='password'>
              <Form.Label style={{color:'black',fontWeight:'700'}}>Confirm Password</Form.Label>
              <span className='d-flex align-content-center'>
              <Form.Control
                type='password'
                placeholder='confirm new password'
                value={Cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              ></Form.Control>
              {
                  !visible 
                  ? <FaEyeSlash style={{cursor:"pointer"}} onClick={()=>setVisible(!visible)}/>
                  : <FaEye style={{cursor:"pointer"}} onClick={()=>setVisible(!visible)}/>     
              }
              </span>
            </Form.Group>

            <Button type='submit' className='btn-block rounded my-3' variant='warning'>
              Change password
            </Button>
          </Form>
        </FormContainer>
        </Container>
    );
}

export default LoginScreen
