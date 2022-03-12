import React, { useState,useEffect } from 'react';
import { Form, Button, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer';
import { saveShippingAddress } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckOut from '../../components/CheckOut/CheckOut';
import '../../bootstrap.min.css';
const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const [show ,setShow] = useState(false);
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState('')
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/placeorder')
    }
    
    useEffect(() => {
        window.innerWidth <= 767 ?setShow(true) :setShow(false);
    }, [])

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
                        {!show && <CheckOut step1 step2 />}
                        <h3 style={{textAlign:"left",width:"85%",padding:"1.5rem 0.25rem",fontSize:'22px'}}>Shipping Address</h3>
                        <Form onSubmit={submitHandler} >
                            <Form.Group controlId='address' className='mt-2'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="House no,Building ,street"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='postalCode' className='mt-2'> 
                                    <Form.Label>PostalCode</Form.Label>
                                    
                                        <Form.Control
                                            as='select'
                                            className='custom-select'
                                            required
                                            onChange={(e) =>setPostalCode(e.target.value)}
                                        >
                                            <option value="">
                                                Select Postal Code
                                            </option>
                                            <option  value="781001">
                                                781001
                                            </option>
                                            <option  value="781001">
                                                781002
                                            </option>
                                            <option  value="781001">
                                                781003
                                            </option>
                                            <option  value="781001">
                                                781005
                                            </option>
                                            <option  value="781001">
                                                781007
                                            </option>
                                            <option  value="781001">
                                                781008
                                            </option>
                                            
                                        </Form.Control>
                                </Form.Group>
                            
                            <Form.Group controlId='city' className='mt-2'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Your City'
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                            </Form.Group>

                            

                            <Form.Group controlId='country' className='mt-2'>
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Nearest Landmark'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            ></Form.Control>
                            </Form.Group>

                            <Button className='my-2 mb-3 rounded btn-block' type='submit' variant='warning'>
                                Continue
                            </Button>
                        </Form>
                    </FormContainer>
        </Container>
    )
}

export default ShippingScreen
