import {FaBars, FaTimes ,FaMapMarkerAlt, FaCartPlus, FaSlidersH, FaUser,FaUserCircle,FaList,FaAddressCard , FaShoppingBag, FaSignOutAlt, FaPhoneAlt} from 'react-icons/fa';
import { fadeIn, slideInLeft, slideInRight } from 'react-animations'
import { NavLink as Link } from 'react-router-dom';
import styled, { keyframes} from 'styled-components';

export const Nav = styled.nav`
    background-color: white;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    z-index: 20;
    height: 85px;
    box-shadow: 0px 2px #ebebeb;
    border: 1px solid #ebebeb;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        position: fixed;
        top: 90.4%;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
    }


`;
export const NavImg = styled.img`
    width: 180px;
    height: 65px;
    object-fit: contain;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 100px;
        height: 100px;
        margin: 0.1rem 0.1rem;
    }
`;

const RightAnimation = keyframes`${slideInRight}`;

export const NavMenu = styled.div`
    margin: 2.2rem 0rem;
    z-index: 10;
    @media screen and (min-width: 320px) and (max-width: 767px){
        &.collapsed{
            display: none;
        }
        &.expand{
            position: fixed;
            margin: 0.1rem 0rem;
            height: 90%;
            width: 75vw;
            top: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            background: white;
            animation: 1s ${RightAnimation};
            border-radius: 10px;
        }
    }
`;
export const NavLink = styled(Link)`
    color: black;
    margin: 0.5rem 1.5rem;
    font-size: 1rem;
    font-weight: 800;
    &:hover{
        color: black;
        text-decoration: 3px underline #F5CB05;
    }
    @media screen and (min-width: 320px) and (max-width: 767px){
        margin: 0.6rem 1rem;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    margin: 2.2rem 0rem;
    margin-right: 1.5rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        &.collapsed{
            display: none;
        }
        
    }
`;


export const NavBtnLink = styled(Link)`
    margin: 0.5rem 0.8rem;
    font-size: 0.9rem;
    color: black;
    &:hover{
        color: black;
        text-decoration: none;
    }
    &.active{
        color: black;
        text-decoration: none;
    }
    @media screen and (min-width: 320px) and (max-width: 767px){
        margin: 0.6rem auto;
    }
`;

export const RBars = styled(FaUserCircle)`
  display: none;
  color: #F5CB05;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: block;
    top: 0.8rem;
    position: relative;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 1rem;
  }
`;
export const NavImgMobile = styled.img`
  width: 85px;
    height: 85px;
    object-fit: contain;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 50px;
        height: 50px;
        margin: 0.5rem 0.1rem;
    }
`;
export const ListIcon = styled(FaList)`
  display: none;
  color: #F5CB05;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: block;
    top: 0.6rem;
    position: relative;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 2rem 0rem;
  }
`;
export const RTimes = styled(FaTimes)`
    display: none;
    color: #F5CB05;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        display: block;
        top: 0.8rem;
        position: relative;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.4rem;
        cursor: pointer;
        margin-right:1rem;
    }
`;
export const Marker = styled(FaMapMarkerAlt)`
    color: #F5CB05;
`;
export const AddressCard = styled(FaAddressCard)`
    font-size: 1.25rem;
    color: #F5CB05;
`;
export const Profile = styled(FaUser)`
    font-size: 1rem;
    color: #F5CB05;
`;
export const Shipping = styled(FaShoppingBag)`
    font-size: 1.1rem;
    color: #F5CB05;
`;
export const Signout = styled(FaSignOutAlt)`
    font-size: 1.1rem;
    color: #F5CB05;
`;
export const Phone = styled(FaPhoneAlt)`
    font-size: 1.1rem;
    color: #F5CB05;
`;
export const Cart = styled(FaCartPlus)`
    display: none;
    color: #F5CB05;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        display: block;
        top: 0.8rem;
        position: relative;
        transform: translate(-100%, 75%);
        font-size: 1.4rem;
        cursor: pointer;
        margin: 0rem 1rem;
    }
`;
export const FilterIcon = styled(FaSlidersH)`
    display: none;
    color: #F5CB05;
    @media screen and (min-width: 320px) and (max-width: 767px){
        display: block;
        top: 0.8rem;
        position: relative;
        transform: translate(-100%, 75%);
        font-size: 1.4rem;
        cursor: pointer;
        margin: 0rem 1rem;
    }
`;


export const User = styled(FaUser)`
    color: #F5CB05;
`;

export const Bars = styled(FaBars)`
  color: #F5CB05;
`;
export const Times = styled(FaTimes)`
   
    color: #F5CB05;
    
`;

export const DropDownContainer = styled("div")`
    /* width: 5rem; */
    top: 0%;
    z-index:20;
    height: 100vh;
    @media screen and (min-width: 320px) and (max-width: 767px){
        /* justify-content: flex-end; */
    }
`;
export const DropDownHeader = styled("div")`
    cursor: pointer;
    color: black;
    font-size: 1.2rem;
    margin: 0rem 1.5rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
    }
`;
export const DropDownListContainer = styled("div")`
    position: absolute;
    top: 5.3rem;
    right: 0.05rem;
    height: 100vh;
    min-width: 25%;
    background-color: white;
    margin-bottom: 2rem;
    animation: 0.8s ${RightAnimation} ease-in-out;
    z-index: 10;
    @media screen and (min-width: 320px) and (max-width: 767px){
        top: 2.5rem;
        position: fixed;
        height: 50%;
        /* top: 2rem; */
        right: 0.5rem;
    }
`;
const FadeInAnimation = keyframes`${fadeIn}`;
export const DropDownListContainerSide = styled("div")`
    /* height: 2vh; */
    background-color: white;
    z-index: 10;
    animation: 1.5s ${FadeInAnimation};
`;
export const DropDownList = styled("ul")`
    display: flex;
    height: 100%;
    margin: 0.5rem;
    padding: 0rem 1.5rem;
    flex-direction: column;
    position: relative;
    background: white;
    color: black;
    font-size: 1rem;
    font-weight: 500;
    &:first-child {
        padding-top: 0.15rem;
    }
    z-index: 20;
`;

export const ListItem = styled(Link)`
    color: black;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight:500;
    &.active{
        text-decoration: none;
    }
    &:hover{
        color: black;
        text-decoration: none;
    }
    z-index: 10;
`;

const LeftAnimation = keyframes`${slideInLeft}`;

export const FilterContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    margin-left: 0;
    margin-right: 1rem;
    width: 75vw;
    height: 88%;
    background-color: white;
    border-radius: 15px;
    /* animation: $ 0.5s forwards;
    animation-delay: 2s; */
    animation: 1s ${LeftAnimation};  
`;

export const NoOfItems = styled.sup`
    /* // background:black;borderRadius:"60px",fontWeight:"800",margin:"0rem 0.5rem",padding:"0.25rem",color:"white" */
    background: rgba(0,0,0,0.7);
    border-radius: 5em;
    color: white;
    margin: 0rem 0.5rem;
    padding: 0.25rem 0.45rem;
    font-weight: 900;
`;

