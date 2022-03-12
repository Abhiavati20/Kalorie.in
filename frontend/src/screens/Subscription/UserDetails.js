import React from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
import { useSelector }   from 'react-redux';
const UserDetails = ({nextStep, handleFormData, values, prevStep }) => {
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

  // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
            <FormContainer>
                <Button variant="light" className='my-5' onClick={prevStep}>
                    Go Back
                </Button>
                <h5>hello {userInfo.name}!</h5>
                <Form onSubmit={submitFormData}>
                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type='Number'
                            placeholder='Enter Your Age'
                            value={values.age}
                            onChange={handleFormData('age')}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>weight in kg</Form.Label>
                        <Form.Control
                            type='Number'
                            placeholder='Enter Your Weight'
                            value={values.weight}
                            onChange={handleFormData('weight')}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Height in m</Form.Label>
                        <Form.Control
                            type='Number'
                            placeholder='Enter Your Height'
                            value={values.height}
                            onChange={handleFormData('height')}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>BMI</Form.Label>
                        <Form.Control
                            type='Number'
                            placeholder='Your BMI will be'
                            value={values.bmi}
                            onChange={handleFormData('bmi')}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Daily Activity</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your Daily Exercise Activity in mins'
                            value={values.dailyActivity}
                            onChange={handleFormData('dailyActivity')}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='warning' className='my-3'>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
    );
};

export default UserDetails;