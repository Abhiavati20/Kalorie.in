import React, {useState} from 'react'
import styled from "styled-components";
import SearchBox from '../../components/SearchBox/SearchBox';
import { Form }       from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom';
import {FaCaretDown, FaCaretUp, FaSlidersH} from 'react-icons/fa';
import {  useLocation }               from 'react-router-dom';
import { Link } from 'react-router-dom';
const Container = styled.div`
    position: sticky;
    display: flex;
    justify-content: space-evenly;
    width: 95%;
    margin: 0.1rem auto;
    
    border-radius: 5px;
    
`;
const SubFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const FilterIcon = styled(FaSlidersH)`
    color:#F5CB05;
`;
const SubFilterHeader = styled.div`
    margin: 0rem auto;
    justify-content: space-between;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    padding: 0.45rem 1rem;
    margin-right: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 5px #e5e5e5;  
`;
const SubFilterItems = styled.div`
    position: absolute;
    top: 88%;
    width: 60%;
    margin-right:47%;
    margin-left: 0%;
    align-items: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 1px 1px #e5e5e5;
    z-index:10;
    >hr{
        margin-right: 1rem;
        width: 80%;
        font-size: 1.2rem;
        font-weight: 800;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
        top: 7.5%;
        left: 0.25rem;
        width: 97%;
        margin: 0 auto;
    }
`;
const ItemGrp = styled.div`
    display: flex;
    justify-content: space-evenly;
    /* flex-direction: column; */
    width: 100%;
    color: black;
    margin: 0.5rem 0rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        margin: 0.25rem 0rem;
    }

`;

const ItemLink = styled.div`
    margin:0.25rem 1rem;
    text-align: right;
    text-decoration: none;
    color:black;
    &.active{
        text-decoration: underline #F5CB05;
        
    }
    &:hover{
        text-decoration: underline #F5CB05;
    }
`;

const CalorieHeader = styled.h5`
    justify-content: space-between;
    /* font-size: 1rem; */
    cursor: pointer;
`;
const CalorieItems = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    padding: 1rem;
    background-color: white;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        /* padding: 0.5rem 0rem; */
        /* width: 100%; */
        padding: 0.15rem 0rem;
    }
`;

const CalorieLink = styled(Link)`
    margin:0.25rem 1rem;
    border: 1px solid black;
    padding: 0.2rem 0.5rem;
    border-radius:15px;
    @media screen and (min-width: 320px) and (max-width: 767px){
        /* margin: 0.1rem 0.5rem; */
        margin: 0rem;
        padding: 0rem;
    }
`;

const Filter = ({isVeg,show}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [isOpenCal,setIsOpenCal] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const addQuery = (key, value) => {
            
        let pathname = '/search';
        let searchParams = new URLSearchParams(location.search);
        searchParams.set(key, value);
        navigate({
            pathname: pathname,
            search: searchParams.toString()
        });
        
    };
    const handleChange = (e) =>{
        if(e.target.placeholder==="veg")
        {
            if(e.target.checked){
                addQuery("isVeg","true")
            }
            else{
                navigate('/');
            }
        }
        else{
            if(e.target.checked){
                addQuery("isVeg","false")
            }
            else{
                navigate('/');
            }
        }
    }
    return !show ? (
        <>
        <Container >
            <SearchBox/>
            <Form.Group controlId='isVeg' className='d-flex  justify-content-around' style={{width:'30%'}}>
                <div 
                    style={{
                        backgroundColor:"white",
                        borderRadius:"10px",
                        height:"4vh",
                        margin: "0.44rem 0rem",
                        padding: "0.45rem 1rem",
                        minHeight:"2.3rem",
                        boxShadow: "0px 0px 10px 1px #e1e1e1",
                    }} 
                    
                >
                    <Form.Check
                        type='checkbox'
                        label='Veg'
                        style={{borderRadius:"15px"}}
                        onChange={(e) => handleChange(e)}
                        placeholder="veg"
                        className="custom-checkbox"    
                    ></Form.Check>
                </div>
                <div 
                    style={{
                        backgroundColor:"white",
                        borderRadius:"10px",
                        height:"4vh",
                        margin: "0.44rem 0.1rem",
                        padding: "0.45rem 0.5rem",
                        minHeight:"2.3rem",
                        boxShadow: "0px 0px 10px 1px #e1e1e1",
                    }}
                >
                    <Form.Check
                        type='checkbox'
                        label='Non-Veg'
                        checked={isVeg==='false'}
                        style={{borderRadius:"15px"}}
                        className="custom-checkbox"
                        placeholder="nonveg"
                        onChange={(e)=>handleChange(e)}
                    ></Form.Check>
                </div>
            </Form.Group>
            <SubFilter>
                <SubFilterHeader onClick={() => setIsOpen(!isOpen)}>
                    <FilterIcon /> Filter {isOpen ? (<FaCaretUp  style={{color:"#F5CB05"}}/>) : (<FaCaretDown style={{color:"#F5CB05"}} />)}
                </SubFilterHeader>
                {
                    isOpen && (
                        <SubFilterItems>
                            <a href='/' className ='btn' style={{textTransform:'capitalize',border:"2px solid #fac508",margin:'0.5rem 1rem',padding:'0.25rem',borderRadius:'10px'}} onClick={()=>{setIsOpen(!isOpen)}}>Clear Filter</a>
                            <h5 style={{padding:"0.5rem 0rem 0rem 0rem"}}>Nutrients</h5>
                            <ItemGrp>
                                
                                <ItemLink to='/search?nutrients=highproteins' onClick={()=>{addQuery("nutrients","highproteins");setIsOpen(!isOpen)}}>High Proteins</ItemLink>
                                <ItemLink to='/search?nutrients=lowcarbs' onClick={()=>{addQuery("nutrients","lowcarbs");setIsOpen(!isOpen)}}>Low-Carbs</ItemLink>
                                <ItemLink to='/search?nutrients=balanced' onClick={()=>{addQuery("nutrients","balanced");setIsOpen(!isOpen)}}>Balanced</ItemLink>
                            </ItemGrp>
                            <CalorieHeader onClick={() => setIsOpenCal(!isOpenCal)} style={{textAlign:"center", background:"transparent", margin:"1rem"}}>
                                Calorie Range  {isOpenCal ? (<FaCaretUp  style={{color:"black"}}/>) : (<FaCaretDown style={{color:"black"}} />)}
                            </CalorieHeader>
                            {
                                isOpenCal && (
                                    <CalorieItems style={{display:"flex",width:"100%",flexDirection:"row",margin:"0rem auto"}}>
                                        <CalorieLink 

                                            to ='/'
                                        >
                                            All
                                        </CalorieLink>
                                        <CalorieLink
                                            to={`/search?minCal=0&maxCal=200`} 
                                            
                                        >
                                            0-200
                                        </CalorieLink>
                                        <CalorieLink 
                                            style={{
                                                margin:"0.25rem 1rem",
                                                border: "1px solid black",
                                                padding: "0.2em 0.5rem",
                                                borderRadius:"15px"
                                            }}
                                            to='/search?minCal=201&maxCal=500' 
                                            
                                        >
                                            200-500
                                        </CalorieLink>
                                        <CalorieLink 
                                            style={{
                                                margin:"0.25rem 1rem",
                                                border: "1px solid black",
                                                padding: "0.2em 0.5rem",
                                                borderRadius:"15px"
                                            }}
                                            to='/search?minCal=501&maxCal=9999' 
                                        >
                                            500 +
                                        </CalorieLink>
                                    </CalorieItems>
                                )
                            }
                        </SubFilterItems>
                    )
                }                
            </SubFilter>
            
        </Container>
        {!show &&<hr style={{color:'#cecece',width:'84%',border:'1px solid #cecece'}} 
                                        />}
        </>
    ) : (
        <SubFilter>
            <SubFilterHeader onClick={() => setIsOpen(!isOpen)}>
                <FilterIcon /> Filter {isOpen ? (<FaCaretUp  style={{color:"#F5CB05"}}/>) : (<FaCaretDown style={{color:"#F5CB05"}} />)}
            </SubFilterHeader>
            {
                isOpen && (
                    <SubFilterItems>
                        <a href='/' className ='btn' style={{textTransform:'capitalize',border:"2px solid #fac508",margin:'0.5rem 1rem',padding:'0.25rem',borderRadius:'10px'}} onClick={()=>{setIsOpen(!isOpen)}}>Clear Filter</a>
                        <div style={{display:"flex",width:"100%",justifyContent:"space-evenly"}}>
                            <Form.Check
                                type='checkbox'
                                label='Veg'
                                style={{borderRadius:"15px",margin:"0.5rem 0rem"}}
                                onChange={(e) => {handleChange(e); setIsOpen(false)}}
                                checked={isVeg==='true'}
                                placeholder="veg"
                                className="custom-checkbox"    
                            ></Form.Check>
                            <Form.Check
                                type='checkbox'
                                label='Non-Veg'
                                checked={isVeg==='false'}
                                style={{borderRadius:"15px",margin:"0.5rem 0rem"}}
                                className="custom-checkbox"
                                placeholder="nonveg"
                                onChange={(e)=>{handleChange(e);setIsOpen(!isOpen)}}
                            ></Form.Check>
                        </div>
                        <h5 style={{padding:"0.5rem 0rem 0rem 0rem"}}>Nutrients</h5>
                        <ItemGrp>                        
                                <ItemLink to='/search?nutrients=highproteins' onClick={()=>{addQuery("nutrients","highproteins");setIsOpen(!isOpen)}}>High Proteins</ItemLink>
                                <ItemLink to='/search?nutrients=lowcarbs' onClick={()=>{addQuery("nutrients","lowcarbs");setIsOpen(!isOpen)}}>Low-Carbs</ItemLink>
                                <ItemLink to='/search?nutrients=balanced' onClick={()=>{addQuery("nutrients","balanced");setIsOpen(!isOpen)}}>Balanced</ItemLink>
                                
                        </ItemGrp>
                        <CalorieHeader onClick={() => setIsOpenCal(!isOpenCal)} style={{textAlign:"center", background:"transparent", margin:"1rem"}}>
                            Calorie Range  {isOpenCal ? (<FaCaretUp  style={{color:"black"}}/>) : (<FaCaretDown style={{color:"black"}} />)}
                        </CalorieHeader>
                        {
                            isOpenCal && (
                                <CalorieItems style={{display:"flex",width:"100%",flexDirection:"row",margin:"0rem auto"}}>
                                    <CalorieLink 
                                        style={{
                                               
                                                border: "1px solid black",
                                                padding: "0.2em 0.5rem",
                                                borderRadius:"15px"
                                        }}
                                        to='/'
                                    >
                                        All
                                    </CalorieLink>
                                    <CalorieLink 
                                        style={{
                                            margin:"0.25rem 1rem",
                                            border: "1px solid black",
                                            padding: "0.2em 0.5rem",
                                            borderRadius:"15px"
                                        }}
                                        to='/search?minCal=0&maxCal=200' 
                                    >
                                        0-200
                                    </CalorieLink>
                                    <CalorieLink 
                                        style={{
                                            margin:"0.25rem 1rem",
                                            border: "1px solid black",
                                            padding: "0.2em 0.5rem",
                                            borderRadius:"15px"
                                        }}
                                        to='/search?minCal=201&maxCal=500' 
                                    >
                                        200-500
                                    </CalorieLink>
                                    <CalorieLink 
                                        style={{
                                            margin:"0.25rem 1rem",
                                            border: "1px solid black",
                                            padding: "0.2em 0.5rem",
                                            borderRadius:"15px"
                                        }}
                                        to='/search?minCal=501&maxCal=9999' 
                                    >
                                        500 +
                                    </CalorieLink>
                                </CalorieItems>
                            )
                        }
                    </SubFilterItems>
                )
            }                
        </SubFilter>   
    )
}

export default Filter
