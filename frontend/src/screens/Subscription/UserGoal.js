import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
// creating functional component ans getting props from app.js and destucturing them
const UserGoal = ({ nextStep, handleFormData, values, prevStep }) => {
  //creating error state for validation

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
        <FormContainer>
            <Button variant='light' className='my-2' onClick={prevStep}>
                Go Back
            </Button>
            <h1>Your Goal</h1>
            <Form onSubmit={submitFormData}>
                <Form.Group className='my-3'>
                    <Form.Label as='p'>Select Your Goal</Form.Label>
                    <Col>
                        <Form.Control
                            as='select'
                            value={values.goal}
                            onChange={handleFormData('goal')}
                        >
                            <option  value="Healthy Eating">
                                Healthy Eating
                            </option>
                            <option  value="Lose Weight">
                                Lose Weight
                            </option>
                            <option  value="Gain Muscle">
                                Gain Muscle
                            </option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label as='p'>Select Your Meal Type</Form.Label>
                    <Col >
                        <Form.Control
                            as='select'
                            value={values.mealType}
                            onChange={handleFormData('mealType')}
                        >
                            <option  value="Vegetarian">
                                Vegetarian
                            </option>
                            <option  value=" Non-Vegetarian">
                                Non-Vegetarian
                            </option>
                            <option  value="Eggeterian">
                                Eggeterian
                            </option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Label as='p'>Select Your Prefered Diet Type</Form.Label>
                    <Col >
                        <Form.Control
                            as='select'
                            value={values.dietType}
                            onChange={handleFormData('dietType')}
                        >
                            <option  value="Let The Nutrition Decide">
                            Let The Nutrition Decide
                            </option>
                            <option  value="Ketogenic">
                                Ketogenic (rapid weight loss)
                            </option>
                            <option  value="Low Carb">
                                Low Carb
                            </option>
                            <option  value="Balanced">
                                Balanced
                            </option>
                            <option  value="Vegan">
                                Vegan
                            </option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                
                
                <Button type='submit' variant='warning'  className=' m-2 my-3'>
                    Continue
                </Button>
                
            </Form>
        </FormContainer>
  );
};

export default UserGoal;