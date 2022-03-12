import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
    return (
    <footer className='bg-white w-100' >
        <Container>
            <Row>
                <Col className='py-3' md={3}>
                    <h5 style={{textAlign:"left",width:"40%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"14px"}}>About Us</h5>
                    <p>Kalorie is a combined thought to solve one of the biggest problems for those who want to achieve their fitness goals.</p>
                    <Link to ='/about' className='btn-warning p-2 rounded'>Know More</Link>
                </Col>
                <Col className='py-3' md={3}>
                    <h5 style={{textAlign:"left",width:"40%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"14px"}}>Contact Us</h5>
                    <p style={{display:'flex',flexDirection:'column'}}>
                        <span><FaPhoneAlt style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1rem'}}/> 78969998929 </span>
                        <span><FaEnvelope style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1rem'}} /><a href='mailto:contact@kalorie.in' target='_blank'>contact@kalorie.in</a></span>
                    </p>
                </Col>
                <Col className='py-3' md={3}>
                    <h5 style={{textAlign:"left",width:"40%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"14px"}}>Legal Help</h5>
                    <p style={{display:'flex',flexDirection:'column'}}>
                        
                        <Link to ='/termsAndCondition'>Terms And Conditions</Link>
                        <Link to ='/privacyPolicy'>Privacy Policy</Link>
                        
                        <Link to ='/deliveryPolicy'>Delivery Policy</Link>
                    </p>
                </Col>
                <Col className='py-3' md={3}>
                    <h5 style={{textAlign:"left",width:"40%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"14px"}}>Follow Us</h5>
                    <p >
                        <a href='https://www.facebook.com/KALORIEin-101064752518199/' target='_blank'><FaFacebook  style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.5rem'}} /></a>
                        {/* <a href='https://www.twitter.com' target='_blank'><FaTwitter style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.5rem'}} /></a> */}
                        {/* <a href='' target='_blank'><FaLinkedin style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.5rem'}} /></a> */}
                        <a href ='https://www.instagram.com/kalorie.in/?hl=en' target='_blank'><FaInstagram  style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.5rem'}} /></a>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>Copyright &copy; GREENDIET</Col>
            </Row>
        </Container>
    </footer>
    )
}

export default Footer