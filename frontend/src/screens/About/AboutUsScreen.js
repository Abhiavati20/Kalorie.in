import React from 'react'
import styled from 'styled-components'
import Berry from './kalorie.png'
import {Link} from "react-router-dom"

const AboutUsContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem auto;
`;

const FirstWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;
const SecondWrapper = styled.div`
    display: flex;
    width: 75%;
    justify-content: space-around;
    margin: 2.5rem auto;
`;

const ThirdWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FirstWrapperContent = styled.div`
    width: 25%;
    height: 65%;
    margin: auto;
`;


const OurMission = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 35%;
    padding: 35px;
    border: 1px solid #F7F4AA;
    border-radius: 50px;
    background-color: #F7F4AA;
`;

const OurVision = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 25%;
    width: 30%;
    padding: 30px;
    border: 2px solid black;
    border-radius: 50px;
`;

const HomeLink = styled(Link)`
    color: white;
    background-color: #F5CB05;
    border-radius: 20px;
    padding: 10px 10px;
`;


const AboutUsScreen = () => {
    return (
        <AboutUsContent>
            <FirstWrapper>
                <FirstWrapperContent>
                    <h1>About <span style={{color:'#F5CB05'}}>KALORIE</span></h1>
                    <p>
                        Kalorie is a combined thought of — and — to solve one of the biggest problems for those who want to achieve their fitness goals. Pandemic has taught everyone a lesson. One such casual talk with our friend who was worrying about  gyms being closed during lockdown led us to this idea. if not gym, why can't a healthy diet be a wiser choice! so started Kalorie to help anyone in Guwahati who wants to stay fit. 
                    </p>
                    <h3>Why <span style={{color:'#F5CB05'}}>KALORIE</span></h3>
                    <p>
                    At Kalorie, we serve healthy food with irresistible taste to anyone in Assam who values their health as wholesome. With the help of our dietician, we designed Kalorie in a way to ensure to provide you with a tasty, hygienic meal prepared from fresh ingredients 
                    </p>
                    <p>Our wide range of menu is filled with calorie counted food to keep you fit and feel light. Food that is more attractive and tasty may not be the best for your health and to the sad truth, we are often addicted to it. To keep you out of this guilt, we incorporate all the modern food from pizza, sandwiches, and many more with the right ingredients that are healthy and delicious.</p>
                </FirstWrapperContent>
                <img style={{margin:'auto'}} src={Berry} alt="berry" width="680px" height="820px" />
            </FirstWrapper>
            <SecondWrapper>
                <OurMission>
                    <p style={{'fontWeight':'800'}}>Choosing to stay fit and healthy demands a conscious effort amidst all the unhealthy temptations. At Kalorie, we are more interested in what you EAT. If your goal is to maintain your fitness, then we are here to carry half of your burden of preparing a nutritious diet. We provide calorie counted healthy meals made from fresh meat and veggies without disappointing your taste-buds</p>
                    <h5 style={{margin:'1rem'}} >Our <span style={{color:'#F5CB05'}}>Mission</span></h5>
                </OurMission>
                <OurVision>
                    <p>
                    Our mission is to provide a healthy diet not just to the fitness industry but to anyone who wants to achieve their fitness goal by designing our menus in a way that’s highly nutritious and delicious. 
                    </p>
                    
                    <h5 style={{margin:'1rem'}}>Our <span style={{color:'#F5CB05'}}>Vision</span></h5>
                </OurVision>
            </SecondWrapper>
            <ThirdWrapper>
                <h4>
                    So the next time you’re hungry and if you choose to eat healthy food delivered at your doorstep, TRY KALORIE
                </h4>
                <HomeLink  to='/'>
                    Order Now
                </HomeLink>
            </ThirdWrapper>
        </AboutUsContent>
    )
}

export default AboutUsScreen
