import React, {useState} from 'react'
import styled from "styled-components";
import SearchBox from '../../components/SearchBox/SearchBox';
import { Form }       from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom';
import {FaCaretDown, FaCaretUp, FaMapMarkerAlt, FaSlidersH} from 'react-icons/fa';
import {  useLocation }               from 'react-router-dom';
import { Link } from 'react-router-dom';
import { keyframes} from 'styled-components';
import { zoomInUp } from 'react-animations'
const Container = styled.div`
    position: sticky;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0.1rem auto;
    border-radius: 5px;
    padding: 1rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        padding: 0.5rem ;
        margin: 0rem;
        top: 0rem;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        justify-content:center;
    }
`;

const DropDownContainer = styled("div")`
    margin-top: 0.5rem;
    width: 8rem;
`;

const DropDownHeader = styled("div")`
  padding: 0.38rem 0.25rem;
  text-align: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    opacity: 0.8;
  font-size: 1rem;
  color: black;
  background: #ffffff;
  cursor: pointer;
  border-radius: 10px;
  @media (min-width: 768px) and (max-width: 1024px){
        padding: 0.5rem;
}   
`;

const DropDownListContainer = styled("div")`
    position: absolute;
    margin: 0.5rem 0rem;
    padding: 1rem;
    left: 52%;
    text-align: center;
    background: white;
    border-radius: 10px;
    @media screen and (min-width: 320px) and (max-width: 767px){
        left:0;
        width: 100%;
    }
`;

const DropDownList = styled("ul")`
    display: flex;
    padding: 0.5rem;
    margin: 0;
    text-align: center;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    &:first-child {
        padding-top: 0.8em;
    }
    z-index:20;
`;

const ListItem = styled(Link)`
  list-style: none;
  z-index:20;
  margin: 0rem 1rem;
`;

const DropDownContainerCat = styled("div")`
    @media screen and (min-width: 320px) and (max-width: 767px)
    {margin : 0.5rem auto;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        /* top: 7.6rem; */
        margin: 0.25rem 3rem 0.5rem;
        /* width: 8rem; */
    }
`;

const DropDownHeaderCat = styled("div")`
    @media screen and (min-width: 320px) and (max-width: 767px){
    
    
        position: fixed;
        left: 0;
        right: 0;
        width: 30%;
        bottom: 10%;
        cursor: pointer;
        color: white;
        border: 3px solid #c3a321;
        background-color: #c3a321;
        outline: #F5CB05;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0rem auto;
        padding: 0rem;
        border-radius: 10px;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        position: fixed;
        right: 0;
        left: 20%;
        width: 15%;
        bottom: 10%;
        cursor: pointer;
        color: white;
        border: 3px solid #c3a321;
        background-color: #c3a321;
        padding: 0.25rem 0.25rem;
        border-radius: 10px;
        text-align: center;
        margin: 0;
    }
`;

const DropDownListContainerCat = styled("div")`
    @media screen and (min-width: 320px) and (max-width: 767px){
        position: fixed;
        left: 0;
        right: 0;
        
        width: 100%;
        margin: 0 auto;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        position: fixed;
        left: 0%;
        right: 0%;
        right: 0;
        left: 20%;
        width: 25%;
        bottom: 33%;
        margin: 0rem;
    }
`;
const FadeInAnimation = keyframes`${zoomInUp}`;

export const DropDownListCat = styled("ul")`
    @media screen and (min-width: 320px) and (max-width: 767px){
    display: flex;
    flex-direction: column;
    position: fixed;
    background: white;
    border-radius: 10px;
    color: black;
    font-size: 1rem;
    font-weight: 500;
    z-index: 10;
    width: 50%;
    left: 0;
right: 0;
bottom:14%;
margin: 0 auto;
    animation: 1.5s ${FadeInAnimation};
    &:first-child {
        padding-top: 0.15rem;
    }
    }
    @media (min-width: 768px) and (max-width: 1024px){
        position: fixed;
        display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    color: black;
    font-size: 1rem;
    font-weight: 500;
    z-index: 10;
    width: 25%;
    animation: 1.5s ${FadeInAnimation};
    &:first-child {
        padding-top: 0.15rem;
    }   
    }

`;

const ListItemCat = styled(Link)`
  list-style: none;
  z-index:20;
  margin: 0rem 1rem;
`;
const Filter = ({isVeg,show,city}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const [isOpenCal,setIsOpenCal] = useState(false);

    const [isOpenCat, setIsOpenCat] = useState(false);
    const searchParams = new URLSearchParams(useLocation().search);
    const category = searchParams.get('category') ?searchParams.get('category') : '';

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
    return !show ? (
        <div>
        <Container >
            <SearchBox width1={'350px'}/>
            <Form.Group controlId='isVeg' className='d-flex mt-2' style={{width:window.innerWidth>1024?'20%':'50%',justifyContent:'space-evenly'}}>
                <div 
                    style={{
                        backgroundColor:"white",
                        borderRadius:"10px",
                        height:"4vh",
                        padding: "0.45rem 2rem",
                        minHeight:"2.3rem",
                        boxShadow: "0px 0px 10px 1px #e1e1e1",
                        // margin: '0rem 1rem'
                    }} 
                    onClick={()=>{addQuery("isVeg","true")}}
                >
                    <Form.Check
                        type='checkbox'
                        checked={isVeg==='true'}
                        style={{borderRadius:"15px"}}
                        // onChange={(e) => handleChange(e)}
                        onChange={()=>{isVeg==="true"?navigate('/'):addQuery("isVeg","true")}}
                        placeholder="veg"
                        // className="custom-checkbox"    
                    ></Form.Check>
                    <label>Veg</label>
                </div>
                <div 
                    style={{
                        backgroundColor:"white",
                        borderRadius:"10px",
                        height:"4vh",
                        padding: "0.45rem 2rem",
                        minHeight:"2.3rem",
                        boxShadow: "0px 0px 10px 1px #e1e1e1",
                    }}
                    onClick={()=>{addQuery("isVeg","false")}}
                >
                    <Form.Check
                        type='checkbox'
                        // label='Non-Veg'
                        checked={isVeg==='false'}
                        style={{borderRadius:"15px"}}
                        className="custom-checkbox"
                        onChange={()=>{isVeg==="false"?navigate('/'):addQuery("isVeg","false")}}
                        // onChange={(e)=>handleChange(e)}
                    ></Form.Check>
                    <label>Non Veg</label>
                </div>
            </Form.Group>
            <DropDownContainer>
                <DropDownHeader onClick={toggling}> <FaSlidersH style={{color:"#F5CB05"}} /> Filter {isOpen ? (<FaCaretUp  style={{color:"#F5CB05"}}/>) : (<FaCaretDown style={{color:"#F5CB05"}} />)}</DropDownHeader>
                {
                    isOpen && (
                        <DropDownListContainer>
                            <h5 style={{color:'#F5CB05',border:'1px solid black',width:'30%',cursor:'pointer',borderRadius:'10px',padding:'0.5rem 0.25rem',margin:'0.5rem auto'}} onClick={()=>{setIsOpen(!isOpen);navigate('/')}}>Clear Filter</h5>
                            <h5>nutrients</h5>
                            <DropDownList>
                                <ListItem to='/search?nutrients=highproteins' onClick={()=>{addQuery("nutrients","highproteins");setIsOpen(!isOpen)}}>High Proteins</ListItem>
                                <ListItem to='/search?nutrients=lowcarbs' onClick={()=>{addQuery("nutrients","lowcarbs");setIsOpen(!isOpen)}}>Low-Carbs</ListItem>
                                <ListItem to='/search?nutrients=balanced' onClick={()=>{addQuery("nutrients","balanced");setIsOpen(!isOpen)}}>Balanced</ListItem>
                            </DropDownList>
                            <DropDownList style={{flexDirection:'column'}}>
                                <h5  style={{textAlign:'center',width:'100%',margin:'0 auto'}} onClick={()=>setIsOpenCal(!isOpenCal)}>  Calories {isOpenCal ? (<FaCaretUp  style={{color:"#F5CB05"}}/>) : (<FaCaretDown style={{color:"#F5CB05"}} />)}</h5>
                                {
                                    isOpenCal && (
                                        // <DropDownListContainer>
                                            <DropDownList >
                                                <ListItem style={{
                                                        border: "1px solid black",
                                                        padding: '0.5rem',
                                                        borderRadius:'10px'    
                                                    }}
                                                    to='/'
                                                >
                                                    All
                                                </ListItem>
                                                <ListItem style={{
                                                        border: "1px solid black",
                                                        padding: '0.5rem',
                                                        borderRadius:'10px'
                                                    }}
                                                    to='/search?minCal=0&maxCal=200' 
                                                >
                                                    0-200
                                                </ListItem>
                                                <ListItem 
                                                    style={{
                                                        border:"1px solid black",
                                                        padding: '0.5rem',
                                                        borderRadius:'10px'
                                                    }}
                                                    to='/search?minCal=201&maxCal=500' 
                                                >
                                                    200-500
                                                </ListItem>
                                                <ListItem 
                                                    style={{
                                                        border: "1px solid black",
                                                        padding: '0.5rem',
                                                        borderRadius:'10px'
                                                    }}
                                                    to='/search?minCal=501&maxCal=9999' 
                                                >
                                                    500 +
                                                </ListItem>
                                            </DropDownList>
                                        // </DropDownListContainer>
                                    )
                                }
                            </DropDownList>
                        </DropDownListContainer>
                    )
                }
            </DropDownContainer>
            
        </Container>
        {
            window.innerWidth < 767 && (
                <DropDownContainerCat>
                        <DropDownHeaderCat onClick={()=>setIsOpenCat(!isOpenCat)}>
                                {
                                    isOpenCat ? (
                                        <>
                                            Categories&nbsp;<FaCaretUp />
                                        </>
                                    ) : (
                                        <>
                                            Categories&nbsp;<FaCaretDown/>
                                        </>
                                    )
                                }
                                
                        </DropDownHeaderCat>
                            {
                                isOpenCat && (
                                    <DropDownListContainerCat >
                                        <DropDownListCat>
                                            <ListItemCat className={category === ''  && 'act'} onClick={()=>setIsOpenCat(false)} to='/'>All</ListItemCat>
                                            <ListItemCat to="/search?category=wrap" className={category === 'wrap'  && 'act'}  onClick={()=>{addQuery("category","wrap");setIsOpenCat(false)}}>Wraps</ListItemCat>
                                            <ListItemCat to='/search?category=sandwich' className={category === 'sandwich'  && 'act'}  onClick={()=>{addQuery("category","sandwich");setIsOpenCat(false)}}>Sandwich</ListItemCat>
                                            <ListItemCat to='/search?category=mini' className={category === 'mini'  && 'act'}  onClick={()=>{addQuery("category","mini");setIsOpenCat(false)}}>Mini Breakfast</ListItemCat>
                                            <ListItemCat to='/search?category=burger' className={category === 'burger'  && 'act'}  onClick={()=>{addQuery("category","burger");setIsOpenCat(false)}}>Burgers</ListItemCat>
                                            <ListItemCat to='/search?category=smoothie' className={category === 'smoothie'  && 'act'}  onClick={()=>{addQuery("category","smoothie");setIsOpenCat(false)}}>Smoothies</ListItemCat>
                                            <ListItemCat to='/search?category=salad' className={category === 'salad'  && 'act'}  onClick={()=>{addQuery("category","salad");setIsOpenCat(false)}}>Salads</ListItemCat>
                                            <ListItemCat to='/search?category=meal' className={category === 'meal'  && 'act'}  onClick={()=>{addQuery("category","meal");setIsOpenCat(false)}}>Meals</ListItemCat>
                                            <ListItemCat to='/search?category=oats' className={category === 'oats'  && 'act'}  onClick={()=>{addQuery("category","oats");setIsOpenCat(false)}}>Oats</ListItemCat>
                                            </DropDownListCat>
                                    </DropDownListContainerCat>
                                )
                            }
                    </DropDownContainerCat>
            )
        }
        </div>
        ) : (
            <div>
            <Container style={{flexDirection:'column'}}>
                <div style={{display:'flex',width:'100%',padding:'1rem 0rem',justifyContent:'space-between'}}>
                    <p style={{color:'#F5C508',marginTop:'1rem'}}><FaMapMarkerAlt style={{color:'#F5C508'}} />&nbsp;{city}</p>
                    <DropDownContainer>
                        
                        <DropDownHeader onClick={toggling}> <FaSlidersH style={{color:"#F5CB05"}} /> Filter {isOpen ? (<FaCaretUp  style={{color:"#F5CB05"}}/>) : (<FaCaretDown style={{color:"#F5CB05"}} />)}</DropDownHeader>
                        {
                            isOpen && (
                                <DropDownListContainer>
                                    <Form.Group controlId='isVeg' className='d-flex mt-2' style={{width:'100%',justifyContent:'space-evenly'}}>
                                        <div 
                                            style={{
                                                backgroundColor:"white",
                                                borderRadius:"10px",
                                                
                                                padding: "0.35rem 1rem",
                                                boxShadow: "0px 0px 10px 1px #e1e1e1",
                                                // margin: '0rem 1rem'
                                            }} 
                                            onClick={()=>{addQuery("isVeg","true")}}
                                        >
                                            <Form.Check
                                                type='checkbox'
                                                label='Veg'
                                                style={{borderRadius:"15px"}}
                                                // onChange={(e) => handleChange(e)}
                                                onChange={()=>{addQuery("isVeg","true")}}
                                                placeholder="veg"
                                                // className="custom-checkbox"    
                                            ></Form.Check>
                                        </div>
                                        <div 
                                            style={{
                                                backgroundColor:"white",
                                                borderRadius:"10px",
                                                height:"4vh",
                                                padding: "0.35rem 0.5rem",
                                                minHeight:"2.3rem",
                                                boxShadow: "0px 0px 10px 1px #e1e1e1",
                                            }}
                                            onClick={()=>{addQuery("isVeg","false")}}
                                        >
                                            <Form.Check
                                                type='checkbox'
                                                label='Non-Veg'
                                                checked={isVeg==='false'}
                                                style={{borderRadius:"15px"}}
                                                className="custom-checkbox"
                                                placeholder="nonveg"
                                                onChange={()=>{addQuery("isVeg","false")}}
                                                // onChange={(e)=>handleChange(e)}
                                            ></Form.Check>
                                        </div>
                                    </Form.Group>
                                    <h5 style={{color:'#F5CB05',border:'1px solid black',width:'30%',borderRadius:'10px',cursor:'pointer',padding:'0.5rem 0.25rem',margin:'0.5rem auto'}} onClick={()=>{setIsOpen(!isOpen);navigate('/')}}>Clear Filter</h5>
                                    <h5>nutrients</h5>
                                    <DropDownList>
                                        <ListItem to='/search?nutrients=highproteins' onClick={()=>{addQuery("nutrients","highproteins");setIsOpen(!isOpen)}}>High Proteins</ListItem>
                                        <ListItem to='/search?nutrients=lowcarbs' onClick={()=>{addQuery("nutrients","lowcarbs");setIsOpen(!isOpen)}}>Low-Carbs</ListItem>
                                        <ListItem to='/search?nutrients=balanced' onClick={()=>{addQuery("nutrients","balanced");setIsOpen(!isOpen)}}>Balanced</ListItem>
                                    </DropDownList>
                                    <DropDownList style={{flexDirection:'column'}}>
                                        <h5  style={{textAlign:'center',cursor:'pointer',width:'100%',margin:'0 auto'}} onClick={()=>setIsOpenCal(!isOpenCal)}>  Calories {isOpenCal ? (<FaCaretUp  style={{color:"#F5CB05"}}/>) : (<FaCaretDown style={{color:"#F5CB05"}} />)}</h5>
                                        {
                                            isOpenCal && (
                                                // <DropDownListContainer>
                                                    <DropDownList >
                                                        <ListItem
                                                            to='/'
                                                            onClick={()=>{setIsOpen(!isOpen)}}
                                                        >
                                                            All
                                                        </ListItem>
                                                        <ListItem
                                                            to='/search?minCal=0&maxCal=200'
                                                            onClick={()=>{setIsOpen(!isOpen)}} 
                                                        >
                                                            0-200
                                                        </ListItem>
                                                        <ListItem 
                                                            to='/search?minCal=201&maxCal=500' 
                                                            onClick={()=>{setIsOpen(!isOpen)}}
                                                        >
                                                            200-500
                                                        </ListItem>
                                                        <ListItem
                                                            to='/search?minCal=501&maxCal=9999' 
                                                            onClick={()=>{setIsOpen(!isOpen)}}
                                                        >
                                                            500 +
                                                        </ListItem>
                                                    </DropDownList>
                                                // </DropDownListContainer>
                                            )
                                        }
                                    </DropDownList>
                                </DropDownListContainer>
                                )
                        }
                    </DropDownContainer>
                </div>
                <SearchBox />
            </Container>
            <DropDownContainerCat>
                        <DropDownHeaderCat onClick={()=>setIsOpenCat(!isOpenCat)}>
                                {
                                    isOpenCat ? (
                                        <>
                                            Categories&nbsp;<FaCaretUp />
                                        </>
                                    ) : (
                                        <>
                                            Categories&nbsp;<FaCaretDown/>
                                        </>
                                    )
                                }
                                
                        </DropDownHeaderCat>
                            {
                                isOpenCat && (
                                    <DropDownListContainerCat >
                                        <DropDownListCat>
                                            <ListItemCat className={category === ''  && 'act'} onClick={()=>setIsOpenCat(false)} to='/'>All</ListItemCat>
                                            <ListItemCat to="/search?category=wrap" className={category === 'wrap'  && 'act'}  onClick={()=>{addQuery("category","wrap");setIsOpenCat(false)}}>Wraps</ListItemCat>
                                            <ListItemCat to='/search?category=sandwich' className={category === 'sandwich'  && 'act'}  onClick={()=>{addQuery("category","sandwich");setIsOpenCat(false)}}>Sandwich</ListItemCat>
                                            <ListItemCat to='/search?category=mini' className={category === 'mini'  && 'act'}  onClick={()=>{addQuery("category","mini");setIsOpenCat(false)}}>Mini Breakfast</ListItemCat>
                                            <ListItemCat to='/search?category=burger' className={category === 'burger'  && 'act'}  onClick={()=>{addQuery("category","burger");setIsOpenCat(false)}}>Burgers</ListItemCat>
                                            <ListItemCat to='/search?category=smoothie' className={category === 'smoothie'  && 'act'}  onClick={()=>{addQuery("category","smoothie");setIsOpenCat(false)}}>Smoothies</ListItemCat>
                                            <ListItemCat to='/search?category=salad' className={category === 'salad'  && 'act'}  onClick={()=>{addQuery("category","salad");setIsOpenCat(false)}}>Salads</ListItemCat>
                                            <ListItemCat to='/search?category=meal' className={category === 'meal'  && 'act'}  onClick={()=>{addQuery("category","meal");setIsOpenCat(false)}}>Meals</ListItemCat>
                                            <ListItemCat to='/search?category=oats' className={category === 'oats'  && 'act'}  onClick={()=>{addQuery("category","oats");setIsOpenCat(false)}}>Oats</ListItemCat>
                                            </DropDownListCat>
                                    </DropDownListContainerCat>
                                )
                            }
                    </DropDownContainerCat>
            </div>
        )
}

export default Filter
