import React, {useState,useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../../bootstrap.min.css'
const FormContainer = ({ children }) => {
  const [show ,setShow] = useState();
  useEffect(() => {
    window.innerWidth <= 767 ?setShow(true) :setShow(false);
  }, [])
  return (
    <Container 
      style={show?null:{
        margin: '0 auto',
        height:'100%',
        width: "60%",
        marginBottom:'1rem',
        padding: '2rem auto',
        background:'white', 
        borderRadius:"15px",
        boxShadow:  "0px 0px 10px 1px #e1e1e1",
      }}
    >
      <Row className='my-2 w-100 justify-content-center align-content-center'>
        <Col sm={12} md={9}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer;