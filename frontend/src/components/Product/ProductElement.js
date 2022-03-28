import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
    background-color: white;
    margin: 0.5rem 2rem;
    box-shadow: 0px 0px 5px 0.5px #d1d1d1;
    border-radius: 10px;
    width: 35%;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 45%;
        margin: 0.5rem 0.5rem;
    }
    /* margin:0.5rem 2rem;
    border-radius: 10px;
    background-color: white;
    width: 35%;
    box-shadow: 0px 0px 20px 2px #d1d1d1;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 45%;
        height: 6.5%;

        margin: 0.5rem 0.35rem;
    } */
    @media (min-width: 768px) and (max-width: 1024px){
        margin: 0.5rem;
        width: 45%;
    }
`;

export const CardImage = styled.img`
    /* top: 0;
    width: 100%;
    height: 180px;
    border-radius: 5px;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 100%;
        height: 120px;
        margin: 0;
    } */
    width: 100%;
    height: 180px;
    border-radius: 10px;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 100%;
        height: 120px;
    }
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
`;
export const ProductTitle = styled.p`
    /* display: flex;
    width: 100%;
    height: 8vh;
    margin: 0.15rem auto;
    justify-content: space-around;
    padding: 0rem 0rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        height: 11vh;
        margin: 0rem auto;
    } */
    display: flex;
    justify-content: space-around;
    height: 5vh;
    margin: 0.5rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        height: 6vh;
    
    }
    @media (min-width: 768px) and (max-width: 1024px){
        height: 1;
    }
    
`;
export const ProductDesc = styled.div`
    /* width:100%;
    display: flex;
    word-wrap: break-word;
    justify-content: space-between;
    margin: 0.5rem;
    padding: 0.35rem;
    font-weight: 100;
    color: rgba(0,0,0,0.7);
    > button{
        justify-content: center;
        margin: 0 1rem;
        color: white;
        background-color: #F5CB05;
        outline: none;
        border: none;
        text-decoration: none;
        font-weight: 800;
        padding: 0rem 2rem 0rem 2rem;
        border-radius: 3px;
        cursor: pointer;
        box-shadow: 0px 0px 5px 0px #ebebeb;
        font-variant: all-petite-caps;
        font-size: 18px;
        height: 2.4rem;
    }
    >button:disabled
    {
        background: #F5CB05;
        opacity: 0.5;
    }
    @media screen and (min-width: 320px) and (max-width: 767px){
        font-size: 0.85rem;
        
        width: 100%;
        padding: 0.15rem 0.15rem;
        margin: 0rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > button{
            height: 2rem;
            margin: 0rem auto 0.2rem auto;
            margin-bottom: 0.6rem;
        }
    } */
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    > button{
        color: white;
        background-color: #F5CB05;
        outline: none;
        border: none;
        padding:0.25rem 1rem 0.25rem 1rem;
        border-radius: 3px;
        cursor: pointer;
        box-shadow: 0px 0px 5px 0px #ebebeb;
        font-size: 18px;
    }
    >button:disabled
    {
        background: #F5CB05;
        opacity: 0.5;
    }
    @media screen and (min-width: 320px) and (max-width: 767px){
        flex-direction: column;
        text-align: center;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        flex-direction: column;
        text-align: center;
    }
`;

export const ProductLink =styled(Link)`
    /* color: black;
    background: none;
    word-wrap: break-word;
    text-decoration: none;
    padding: 0rem 0.5rem;
    
    cursor: pointer;
    font-size: 1rem;
    &:hover{
        text-decoration: none;
    }
    @media screen and (min-width: 320px) and (max-width: 767px){
        padding: 0rem 0.25rem;
        margin: 0.5rem 0rem ;
        font-size: 0.85rem;  
    } */

`;