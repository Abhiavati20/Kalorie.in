import React from 'react'
import styled from 'styled-components'
import Berry from './kalorie.png'
import {Link} from "react-router-dom"

const AboutUsContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0rem auto;
    background-color: white;
`;

const FirstWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;
const SecondWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 2.5rem auto;
`;

const ThirdWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FirstWrapperContent = styled.div`
    width: 50%;
    margin:auto 0;
    margin-left: 1rem;
    /* word-break:keep-all; */
    text-align: justify;
    letter-spacing: 0.04em;
`;


const OurMission = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 650px;
    height: 650px;
    margin: 0 auto;
    padding: 17px;
    border: 1px solid #F7F4EA;
    border-radius: 75px;
    background-color: #F7F4EA;
`;

const OurVision = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 350px;
    width: 550px;
    margin:0 auto;
    padding: 15px;
    border: 1px solid #676767;
    border-radius: 50px;
`;

const HomeLink = styled(Link)`
    color: white;
    background-color: #F5CB05;
    border-radius: 20px;
    padding: 10px 10px;
    width: 186px;
    height: 45px;
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.04em;
`;


const AboutUsScreen = () => {
    return (
        <AboutUsContent>
            <FirstWrapper>
                <FirstWrapperContent>
                    <h1 style={{fontSize:'50px',lineHeight:'60px',margin:'2rem 0',fontWeight:'800', letterSpacing:'0.04em'}}>About <span style={{color:'#F5CB05'}}>KALORIE</span></h1>
                    <p style={{ fontWeight:'400', fontSize:'18px',lineHeight:'35px',marginBottom:'1.5rem', letterSpacing:'0.04em' }}>
                        Kalorie is a combined thought of — and — to solve one of the biggest problems for those who want to achieve their fitness goals. Pandemic has taught everyone a lesson. One such casual talk with our friend who was worrying about  gyms being closed during lockdown led us to this idea. if not gym, why can't a healthy diet be a wiser choice! so started Kalorie to help anyone in Guwahati who wants to stay fit. 
                    </p>
                    <h1 style={{fontSize:'30px',lineHeight:'34px',margin:'2rem 0rem',fontWeight:'700',letterSpacing:'0.04em'}}>Why <span style={{color:'#F5CB05'}}>KALORIE</span></h1>
                    <p style={{ fontWeight:'400', fontSize:'18px',lineHeight:'35px',marginBottom:'0.5rem',letterSpacing:'0.04em' }}>
                    At Kalorie, we serve healthy food with irresistible taste to anyone in Assam who values their health as wholesome. With the help of our dietician, we designed Kalorie in a way to ensure to provide you with a tasty, hygienic meal prepared from fresh ingredients 
                    </p>
                    <p style={{ fontWeight:'400', fontSize:'18px',lineHeight:'35px',marginBottom:'0.5rem',letterSpacing:'0.04em' }}>Our wide range of menu is filled with calorie counted food to keep you fit and feel light. Food that is more attractive and tasty may not be the best for your health and to the sad truth, we are often addicted to it. To keep you out of this guilt, we incorporate all the modern food from pizza, sandwiches, and many more with the right ingredients that are healthy and delicious.</p>
                </FirstWrapperContent>
                <img style={{marginRight:'5rem'}} src={Berry} alt="berry" width="480px" height="620px" />
            </FirstWrapper>
            <SecondWrapper>
                <OurMission>
                    <p style={{'fontWeight':'400',width:'550px',height:'650px',fontSize:'22px',marginTop:'5rem',lineHeight:'40px',textAlign:'center',letterSpacing:'0.04em',margin:'auto'}}>Choosing to stay fit and healthy demands a conscious effort amidst all the unhealthy temptations. At Kalorie, we are more interested in what you EAT. If your goal is to maintain your fitness, then we are here to carry half of your burden of preparing a nutritious diet. We provide calorie counted healthy meals made from fresh meat and veggies without disappointing your taste-buds</p>
                    <h5 style={{fontSize:'22px',lineHeight:'25px'}} >Our <span style={{color:'#F5CB05'}}>Mission</span></h5>
                </OurMission>
                <OurVision>
                    <p style={{'fontWeight':'400',width:'450px',height:'650px',fontSize:'22px',marginTop:'2rem',lineHeight:'40px',textAlign:'center',letterSpacing:'0.04em',margin:'auto'}}>
                    Our mission is to provide a healthy diet not just to the fitness industry but to anyone who wants to achieve their fitness goal by designing our menus in a way that’s highly nutritious and delicious. 
                    </p>
                    
                    <h5 style={{fontSize:'22px',lineHeight:'25px'}}>Our <span style={{color:'#F5CB05'}}>Vision</span></h5>
                </OurVision>
            </SecondWrapper>
            <ThirdWrapper>
                <h4 style={{fontSize:'22px',marginTop:'1rem',lineHeight:'25px',textAlign:'center',letterSpacing:'0.04em',fontWeight:'700'}}>
                    So the next time you’re hungry and if you choose to eat healthy food delivered at your doorstep, TRY KALORIE
                </h4>
                <HomeLink  to='/' style={{marginBottom:'2rem'}}>
                    Order Now
                </HomeLink>
            </ThirdWrapper>
        </AboutUsContent>
    )
}

export default AboutUsScreen
