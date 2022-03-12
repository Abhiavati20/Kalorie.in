import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
        <FormContainer>
            <h1>Your Gender</h1>
            <Form onSubmit={submitFormData}>
                <Form.Group>
                    <Form.Label as='p'>Select Gender</Form.Label>
                    <Col>
                        <Form.Control
                            as='select'
                            value={values.userGender}
                            onChange={handleFormData('userGender')}
                        >
                            <option  value="Male">
                                Male
                            </option>
                            <option  value="Female">
                                Female
                            </option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='warning' className='my-3'>
                    Continue
                </Button>
            </Form>
      </FormContainer>
  );
};

export default StepOne;