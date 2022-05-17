import React, { useState,useEffect } from 'react'
import { Link, useLocation }                      from 'react-router-dom'
import { Form, Button, Row, Col,Container }    from 'react-bootstrap'
import { useDispatch, useSelector }  from 'react-redux'
import { useNavigate }               from 'react-router-dom';
import Message                       from '../../components/Message/Message';
import Loader                        from '../../components/Loader/Loader';
import FormContainer                 from '../../components/FormContainer/FormContainer';
import { login }                 from '../../actions/userActions';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import '../../bootstrap.min.css';
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error,userInfo } = userLogin
    const [show ,setShow] = useState(false);
    const redirect = location.search ? location.search.split('=')[1] : ''
    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`);
        }
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [ userInfo, navigate,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password));
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
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='mt-2'>
              <Form.Label style={{color:'black',fontWeight:'700'}}>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='john@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group  className='mt-2' controlId='password'>
              <Form.Label style={{color:'black',fontWeight:'700'}}>Password</Form.Label>
              <span style={{ alignItems:'center' }} className='d-flex align-content-center'>
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

            <Button type='submit' className='btn-block rounded my-3' variant='warning'>
              Login
            </Button>
          </Form>

          <Row className='py-3 mb-3'>
            <Col>
              
              <Link to='/sendEmail'>
                Forget Password
              </Link>
            </Col>
            <Col>
              New Customer?{' '}
              <Link to='/register'>
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
        </Container>
    );
}

export default LoginScreen
