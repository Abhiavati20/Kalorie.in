import React from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
const DietDuration = ({nextStep, handleFormData, values, prevStep }) => {
  
    

  // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();
        let start = new Date(values.startDate);
        let end = new Date(values.endDate);
        let diff = end.getTime() - start.getTime();
        values.noOfDays = Number(diff/(1000*3600*24));
        console.log(values.noOfDays)
        nextStep();
    };

    return (
        <FormContainer>
            <Button variant="light" className='my-5' onClick={prevStep}>
                Go Back
            </Button>
            <h5>Duration</h5>
            <Form onSubmit={submitFormData}>
                <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter start date'
                        value={values.startDate}
                        onChange={handleFormData('startDate')}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter end date'
                        value={values.endDate}
                        onChange={handleFormData('endDate')}
                    ></Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='warning' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default DietDuration;