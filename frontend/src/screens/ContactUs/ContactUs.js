import React from 'react';
import { FaPhoneAlt,FaEnvelope,FaFacebook,FaInstagram } from 'react-icons/fa'
import Footer from '../../components/Footer/Footer';
import FormContainer from '../../components/FormContainer/FormContainer'

const ContactUs = () => {
  return (
      <>
        <div style={{height:'100%'}}>
        <FormContainer >
            <div className='d-flex flex-column my-5'>
                <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"1.5rem"}}>Call Us</h5>
                <span><FaPhoneAlt style={{'color':'#F5CB05','margin':'0.5rem 0.5rem',fontSize:'1rem'}}/> +91 - 78969998929 </span>
                    
                <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"1.5rem"}}>Connect With Us</h5>
                <span><FaEnvelope style={{'color':'#F5CB05','margin':'0.5rem 0.5rem',fontSize:'1rem'}} /><a href='mailto:contact@kalorie.in' target={'_blank'}>contact@kalorie.in</a></span>
                
                <h5 style={{textAlign:"left",width:"100%",padding:"0.5rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"1.5rem"}}>Follow us here</h5>
                <span style={{'margin':'1rem 0rem'}}>
                    <a href='https://www.facebook.com/KALORIEin-101064752518199/' target={'_blank'}><FaFacebook  style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.35rem'}} /></a>
                    {/* <a href='https://www.twitter.com' target='_blank'><FaTwitter style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.5rem'}} /></a> */}
                    {/* <a href='' target='_blank'><FaLinkedin style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.5rem'}} /></a> */}
                    <a href ='https://www.instagram.com/kalorie.in/?hl=en' target={'_blank'}><FaInstagram  style={{'color':'#F5CB05','margin':'0rem 0.5rem',fontSize:'1.35rem'}} /></a>
                </span>    

            </div>
        </FormContainer>
        </div>
        {
            window.innerWidth > 767 && (
                <span  style={{position:'fixed',left:'0',width:'100%',bottom:'0'}}>
                    <Footer/>
                </span>
            )
        }
        </>
  )
}

export default ContactUs