import React from 'react'
import Footer from '../../components/Footer/Footer'
import Berry from './berry.jpg'
import Club from './club.jpg'
const AboutUsScreen = () => {
    return (
        <>
        <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{margin:'4rem auto 0.5rem auto' ,width:'50%',background:'white',borderRadius:'15px',boxShadow: "0px 0px 20px 2px #d1d1d1"}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <span style={{flex:'5'}}>
                        <h3 style={{margin:'1rem',borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:'1.5rem'}}>who are we ?</h3>
                        <p style={{color:'black',margin:'1rem',fontSize:'1rem'}}>Kalorie is a combined thought of — and — to solve one of the biggest problems for those who want to achieve their fitness goals. Our casual talks led to this idea of serving healthy food with irresistible taste to anyone in Assam who values their health as wholesome. With the help of our dietician, we designed Kalorie in a way to ensure to provide you with a tasty, hygienic meal prepared from fresh ingredients</p></span>
                    <img style={{flex:'5',borderRadius:'15px'}} src={Berry} alt='berry'/>
                </div>
            </div>
            <div style={{margin:'2rem auto 1rem auto' ,width:'50%',background:'white',borderRadius:'15px',boxShadow: "0px 0px 20px 2px #d1d1d1"}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img style={{flex:'5',borderRadius:'15px',objectFit:'contain'}}  src={Club} alt='club'/>
                    <span style={{flex:'5'}}>
                        <h3 style={{borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)", margin:'1rem',fontSize:'1.5rem'}}>why choose us ?</h3>
                        <p style={{color:'black',margin:'1rem',fontSize:'1rem'}}>Our wide range of menu is filled with calorie counted food to keep you fit and feel light. Food that is more attractive and tasty may not be the best for your health and the sad truth, we are often addicted to it. To keep you out of this guilt, we incorporate all the modern food from pizza, sandwiches, and many more with the right ingredients that are healthy and delicious.</p></span>    
                </div>
            </div>
            <p style={{textAlign:'center',width:"90%",margin:"1rem auto",color:"black",fontSize:"18px"}}>So the next time you’re hungry and if you choose to eat healthy food delivered at your doorstep, TRY KALORIE!!</p>
        </div>
        <Footer/>
        </>
    )
}

export default AboutUsScreen
