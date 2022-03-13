import React from 'react'
import styled from 'styled-components'
import Berry from './berry.jpg'
import Club from './club.jpg'

const AboutUsContent = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin-bottom: 6rem; */
`;

const FirstWrapper = styled.div`
    display: flex;
    width: 40%;
    border-radius: 10px ;
    margin: auto;
    background-color: white;
    @media screen and (min-width: 320px) and (max-width: 767px){
        flex-direction: column-reverse;
        width: 90%;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        width: 90%;
        margin: 1rem auto;
    }
`;
const SecondWrapper = styled.div`
    display: flex;
    width: 40%;
    border-radius: 10px ;
    margin: 2rem auto 0.5rem ;
    background-color: white;
    @media screen and (min-width: 320px) and (max-width: 767px){
        flex-direction: column;
        width: 90%;
        margin-top: 1rem;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        width: 90%;
        margin: 1rem auto;
    }
`;
const FirstWrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;




const AboutUsScreen = () => {
    return (
        <AboutUsContent>
            <h1 style={{textAlign:'center'}}>About Us</h1>
            <FirstWrapper>
                <FirstWrapperDiv>
                    <h2 style={{borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)"}}>Who are we ?</h2>
                    <p>Kalorie is a combined thought of — and — to solve one of the biggest problems for those who want to achieve their fitness goals. Our casual talks led to this idea of serving healthy food with irresistible taste to anyone in Assam who values their health as wholesome. With the help of our dietician, we designed Kalorie in a way to ensure to provide you with a tasty, hygienic meal prepared from fresh ingredients.</p>
                </FirstWrapperDiv>
                <img style={{borderRadius:'10px'}} src={Club} alt='club'/>
            </FirstWrapper>
            <SecondWrapper>
                <img style={{borderRadius:'10px'}} src={Berry} alt='club'/>
                <FirstWrapperDiv>
                    <h2 style={{borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)"}}>Why Choose Us?</h2>
                    <p>Our wide range of menu is filled with calorie counted food to keep you fit and feel light. Food that is more attractive and tasty may not be the best for your health and the sad truth, we are often addicted to it. To keep you out of this guilt, we incorporate all the modern food from pizza, sandwiches, and many more with the right ingredients that are healthy and delicious.</p>
                </FirstWrapperDiv>
                
            </SecondWrapper>
            <p style={{margin:'0rem auto 5rem', textAlign:'center'}}>
                So the next time you’re hungry and if you choose to eat healthy food delivered at your doorstep, TRY KALORIE!!
            </p>
            
        </AboutUsContent>
    )
}

export default AboutUsScreen
