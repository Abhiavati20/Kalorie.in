import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../../components/FormContainer/FormContainer";
import { saveShippingAddress } from "../../actions/cartActions";
// creating functional component ans getting props from app.js and destucturing them
const ShippingAddress = ({ nextStep, handleFormData, values, prevStep }) => {
  //creating error state for validation
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const dispatch = useDispatch();

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    nextStep();
  };

  return (
        <FormContainer>
            <Button variant='light' className='my-2' onClick={prevStep}>
                Go Back
            </Button>
            <h1>Shipping</h1>
            <Form onSubmit={submitFormData}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) =>{setAddress(e.target.value)}}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button className='my-3' type='submit' variant='warning'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
  );
};

export default ShippingAddress;