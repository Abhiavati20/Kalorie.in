import React from 'react'
// import { Container, Row, Col } from "react-bootstrap";
// import '../../bootstrap.min.css';
// import UserGender from './UserGender'
// import UserGoal from './UserGoal';
// import Final from './Final'
// import UserDetails from './UserDetails';
// import ShippingAddress from './ShippingAddress';
// import DietDuration from './DietDuration';
// import {  useSelector } from 'react-redux';
// import FormContainer from '../../components/FormContainer/FormContainer';
import styled from 'styled-components'
const ComingSoon = styled.div`
    width:  100vw;
    height: 100vh;
    justify-content: center;
    background-color: white;
    align-items:center;
    display: flex;
    background-image: url('https://cdn.dribbble.com/users/1761902/screenshots/8527483/media/9e88b2c1b2f4404045326469fbcc5a8b.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const Subscription = () => {
    // const cart = useSelector((state) => state.cart)
    // const { shippingAddress } = cart

    // const [step, setstep] = useState(1);
    // let date = new Date()
    // //state for form data
    // const [formData, setFormData] = useState({
    //     goal: "Goal",
    //     userGender: "Gender",
    //     age: "",
    //     weight: 0,
    //     height:0,
    //     bmi:0,
    //     dailyActivity:30,
    //     mealType:"vegetarian/non-vegeterian",
    //     dietType : "Vegan",
    //     noOfDays:7,
    //     shippingAddress :shippingAddress,
    //     startDate:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    //     endDate:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    //     itemsPrice:0.0,
    //     taxPrice:0.0,
    //     shippingPrice:0.0,
    //     totalPrice:0.0,
    // })

    // // function for going to next step by increasing step state by 1
    // const nextStep = () => {
    //     setstep(step + 1);
    // };

    // // function for going to previous step by decreasing step state by 1
    // const prevStep = () => {
    //     setstep(step - 1);
    // };
    // const handleInputData = input => e => {
    //     // input value from the form
        
    //     const {value } = e.target;

    //     //updating for data state taking previous state and then adding new value to create new object
    //     setFormData(prevState => ({
    //       ...prevState,
    //       [input]: value
    //     }));
    //     if(e.target.placeholder ==="Enter Your Height")
    //     {
    //         formData.height = Number(formData.height);
    //         formData.weight = Number(formData.weight);
    //         formData.bmi = (formData.weight / (formData.height*formData.height)).toFixed(2);
    //     }
    // }
    
    // switch (step) {
    //     // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    //     case 1:
    //       return (
    //           <Container>
    //               <Row>
    //                   <Col  md={12} className="m-5">
    //                       <UserGender nextStep={nextStep} handleFormData={handleInputData} values={formData} />
    //                   </Col>
    //               </Row>
    //           </Container>
    //       );
    //     // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    //     case 2:
    //         return (
    //             <Container>
    //                 <Row>
    //                     <Col  md={12} className="m-5">
    //                         <UserGoal nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         );
    //     case 3:
    //         return (
    //             <Container>
    //                 <Row>
    //                     <Col  md={12} className="m-5">
    //                         <UserDetails nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         );
    //       // Only formData is passed as prop to show the final value at form submit
    //     case 4:
    //         return (
    //             <Container>
    //                 <Row>
    //                     <Col md={12} className='m-5'>
    //                         <ShippingAddress nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         );
    //     case 5:
    //         return (
    //             <Container>
    //                 <Row>
    //                     <Col md={12} className='m-5'>
    //                         <DietDuration nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         );
    //     case 6:
    //         return (
                
    //             <Container 
    //                 style={{
    //                     background:'white', 
    //                     borderRadius:"15px",
    //                     padding:'0.25rem', 
    //                     boxShadow:"0px 5px 5px 0px rgba(0,0,0,0.5)"
    //                 }}
    //             >
                    
    //                 <Final values={formData}  prevStep={prevStep} />
                        
    //             </Container>
    //         );
    //     // default case to show nothing
    //     default:
    //         return (
    //             <Container>
    //             </Container>
    //         );
    // }
    return (
        <ComingSoon
        >
            {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLoSCWTUulQ_FTZdVPDRa7V6eSpLAwfro8g&usqp=CAU' alt='image1' /> */}
        </ComingSoon>
    )
}

export default Subscription
