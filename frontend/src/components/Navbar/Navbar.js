import React, { useEffect, useState } from 'react'                           // importing react module
import { useDispatch, useSelector }   from 'react-redux'
// import { LinkContainer }            from 'react-router-bootstrap'
// import { Navbar, Nav, NavDropdown}  from 'react-bootstrap'
import { logout }                     from '../../actions/userActions';
import { useNavigate }              from 'react-router-dom';

import {
    AddressCard,
    Shipping,
    Profile,
    Nav,
    NavLink,
    NavImg,
    Bars,
    RBars,
    NavMenu,
    NavBtn,
    Marker,
    NavBtnLink,
    User,
    Times,
    RTimes,
    DropDownContainer,
    DropDownHeader,
    DropDownList,
    DropDownListContainer,
    ListItem,
    Cart,
    ListIcon,
    NavImgMobile,
    NoOfItems,
    Signout,
    Phone,
} from './NavbarElements';
import { getCity, usePosition } from './usePosition';
// functional component of Navbar
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    
    const [click,setClick] = useState(false);
    const [city,setCity] = useState("");
    const [show,setShow] = useState(false);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    
    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login');
    }
    const {latitude, longitude} = usePosition();
        
    useEffect(()=>{
        window.innerWidth <= 767 ?setShow(true) :setShow(false); 
        getCity(latitude,longitude).then(data => setCity(data.locality));
    },[setShow,latitude,longitude])
    let sum = 0;
    cartItems.map(item => sum +=item.qty);
    return (
        <Nav style={show?{border:'2px solid #d1d1d1'}:null}>
            <NavLink to='/'>
                {
                    show ? (
                        <NavImgMobile
                            src="/images/mobile.png"    
                            alt='logo' 
                        />
                    ) : (
                        <NavImg 
                            src="/images/logo.png"    
                            alt='logo' 
                        />
                    ) 
                }
            </NavLink>
            { show && <ListIcon onClick={()=> navigate('/subscription')} />}
            {show &&
                <div style={{display:"block"}}> 
                    <Cart onClick={()=> navigate('/cart')} /> 
                    {cartItems.length > 0 && (<NoOfItems>{sum}</NoOfItems>)}
                </div>
            }

            {!click ? <RBars onClick={()=>setClick(!click)}/> : <RTimes onClick={()=>setClick(!click)}/>}
            
            <NavMenu className = {`collapsed ${click ? "expand" : ""}`}>
                {
                    !show && (
                        <>
                            <NavLink to='/'>
                                Orders
                            </NavLink>
                            <NavLink to='/subscription'>
                                Subscription
                            </NavLink>
                        </>
                    )
                }
                {
                    (show && userInfo) && (
                        userInfo.isAdmin ? (
                            <>
                                <ListItem style={{width:'100%',marginTop:'1.5rem',padding:'0rem 1.5rem'}} onClick={()=>{setClick(false)}} to="/admin/productlist">All Products</ListItem>
                                <ListItem style={{width:'100%',marginTop:'1.5rem',padding:'0rem 1.5rem'}} onClick={()=>{setClick(false)}} to = '/admin/orderlist'>All Orders</ListItem>
                                <ListItem style={{width:'100%',marginTop:'1.5rem',padding:'0rem 1.5rem'}} onClick={()=>{setClick(false)}} to = '/admin/userlist'>All Users</ListItem>
                                <ListItem style={{width:'100%',marginTop:'1.5rem',padding:'0rem 1.5rem'}} to="/" onClick={logoutHandler}><Signout/> Logout</ListItem>
                            </>
                        ) : (
                            <DropDownList>
                                <ListItem style={{width:'100%',marginRight:'10rem',marginTop:'1.5rem',padding:'0rem'}} onClick={()=>{setClick(false)}} to="/profile"><Profile/> Profile</ListItem>
                                <ListItem style={{width:'100%',marginRight:'10rem',marginTop:'0.5rem',padding:'0rem'}} onClick={()=>{setClick(false)}} to = '/orders'><Shipping/> Orders</ListItem>
                                {!show && <ListItem style={{width:'100%',marginRight:'10rem',marginTop:'0.5rem',padding:'0rem'}} onClick={()=>{setClick(false)}} to = '/about'><AddressCard/> About Us</ListItem>}
                                <ListItem style={{width:'100%',marginRight:'10rem',marginTop:'0.5rem',padding:'0rem'}} onClick={()=>{setClick(false)}} to = '/contact'><Phone/> Contact Us</ListItem>
                                <ListItem style={{width:'100%',marginRight:'10rem',marginTop:'0.5rem',padding:'0rem'}} to="/" onClick={logoutHandler}><Signout/> Logout</ListItem>                                                       
                            </DropDownList>
                        )
                    ) 
                }
                {
            
                    show && (
                        <>
                            {!show && <NavBtnLink to='/' ><Marker/>&nbsp;{city}</NavBtnLink>}
                            { 

                                userInfo ?
                                (  
                                    null
                                ) : (
                                    <NavBtnLink onClick={()=>{setClick(false)}} to='/login'><User/>&nbsp;login/sign up</NavBtnLink>
                                ) 
                            }
                        </>
                    )
                }
            </NavMenu>
            
            <NavBtn className = {`collapsed ${click ? "expand" : ""}`}>
                <NavBtnLink to='/' ><Marker/>&nbsp;{city}</NavBtnLink>
                {
                    userInfo ?
                    ( 
                        <DropDownContainer>
                            <DropDownHeader onClick={()=>setIsOpen(!isOpen)}>
                                {isOpen?<Times/>:<Bars/>}
                            </DropDownHeader>
                            {
                                isOpen && (
                                    <DropDownListContainer>
                                        <DropDownList>
                                            {
                                                userInfo.isAdmin ? (
                                                    <>
                                                        <ListItem style={{margin:'0.5rem 0rem'}} onClick={()=>{setIsOpen(false)}} to="/admin/productlist">All Products</ListItem>
                                                        <ListItem style={{margin:'0.5rem 0rem'}} onClick={()=>{setIsOpen(false)}} to = '/admin/orderlist'>All Orders</ListItem>
                                                        <ListItem style={{margin:'0.5rem 0rem'}} onClick={()=>{setIsOpen(false)}} to = '/admin/userlist'>All Users</ListItem>
                                                        <ListItem style={{margin:'0.5rem 0rem'}} to="/" onClick={logoutHandler}><Signout/> Logout</ListItem>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ListItem style={{margin:'0.5rem 0rem',}} onClick={()=>{setIsOpen(false)}} to="/profile"><Profile/> &nbsp;Profiles</ListItem>
                                                        <ListItem style={{margin:'0.5rem 0rem'}} onClick={()=>{setIsOpen(false)}} to = '/orders'><Shipping/>  &nbsp;Orders</ListItem>
                                                        {!show && <ListItem style={{margin:'0.5rem 0rem'}} onClick={()=>{setIsOpen(false)}} to = '/about'><AddressCard/>  &nbsp;About Us</ListItem>}
                                                        <ListItem style={{margin:'0.5rem 0rem'}} onClick={()=>{setIsOpen(false)}} to = '/contact'><Phone/>  &nbsp;Contact Us</ListItem>
                                                        <ListItem style={{margin:'0.5rem 0rem'}} to="/" onClick={logoutHandler}><Signout/> &nbsp;Logout</ListItem>                                                       
                                                    </>
                                                )
                                            }
                                            
                                        </DropDownList>
                                    </DropDownListContainer>
                                )
                            }
                            
                        </DropDownContainer>
                    ) : (
                        <NavBtnLink onClick={()=>{setClick(false)}} to='/login'><User/>&nbsp;login/sign up</NavBtnLink>
                    )
                }
                
            </NavBtn>
        </Nav>    
    );
}

// exporting the functional component
export default Header;