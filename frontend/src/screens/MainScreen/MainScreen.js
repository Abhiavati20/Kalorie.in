import React, { useEffect,useState }        from 'react';
import { useDispatch,useSelector } from 'react-redux'; 
import { useParams, useLocation }               from 'react-router-dom';
import { listProducts }            from '../../actions/productActions';
import {  useNavigate } from 'react-router-dom';
import Loader                      from '../../components/Loader/Loader';
import Message                     from '../../components/Message/Message';
import Cart                        from '../../components/Cart/Cart';
import Filter                      from './Filter';
import ProductSlider               from '../../components/ProductSlider/ProductSlider';

import SearchBox                   from '../../components/SearchBox/SearchBox';
import styled                      from "styled-components";
import ProductsListScreen from './ProductsListScreen';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { keyframes} from 'styled-components';
import { zoomInUp } from 'react-animations'
import { FaCaretDown, FaCaretUp,FaMapMarkerAlt } from 'react-icons/fa';
import { getCity, usePosition } from '../../components/Navbar/usePosition';
import Footer from '../../components/Footer/Footer';
const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 0.5rem auto;
    height: 100%;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        display: flex;
        flex-direction: column;
        margin: 0;
    }
`;

const CategoryContainer = styled.div`
    flex: 2;
    background-color: white;
    border-radius:10px;
    margin-left:1rem ;
    width: 100%;
    height: 7%;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 5px 5px #ebebeb;
    >h3{
        margin: 1rem 1rem 2rem;
        text-align: center;
        text-transform: capitalize;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
        display: none;

    }
`;

const ProductsContainer = styled.div`
    flex: 6;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        flex: 1;
        width: 100%;
        margin: 0;
    }
`;
const CartContainer = styled.div`
    flex: 3;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-radius:10px;
    margin-right:1rem ;
    width: 35%;
    box-shadow: 0px 0px 5px 5px #ebebeb;
    @media screen and (min-width: 320px) and (max-width: 767px) {
        display: none;
    }

`;
export const TabLink = styled(NavLink)`
    color: black;
    margin: 0.5rem 1.5rem;
    font-size: 1rem;
    font-weight: 800;
    &.act{
        color: #F5CB05;
        font-weight:bold;
        text-decoration: none;
    }
    &:hover{
        color: #F5CB05;
        font-weight:bold;
        text-decoration: none;
    }
    
`;

export const DropDownContainer = styled("div")`
    width: 40%;
    margin: auto;
    z-index: 10;
`;
export const DropDownHeader = styled("p")`
    position:fixed;
    left: 0;
    right: 0;
    width: 35%;
    
    /* top: 80%; */
    bottom: 11%;
    cursor: pointer;
    color: white;
    border: 3px solid #c3a321;
    background-color: #c3a321;
    outline: #F5CB05;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0rem auto;
    padding: 0.25rem 0.25rem;
    border-radius: 10px;
    @media screen and (min-width: 320px) and (max-width: 767px){
        /* text-align: cente; */
    }
`;
export const DropDownListContainer = styled("div")`
    position: fixed;
    bottom: 50%;
    left: 0;
    right: 0;
    width: 40%;
    margin: 0rem auto;
    
`;
const FadeInAnimation = keyframes`${zoomInUp}`;

export const DropDownList = styled("ul")`
    
    display: flex;
    flex-direction: column;
    position: fixed;
    background: white;
    border-radius: 10px;
    color: black;
    font-size: 1rem;
    font-weight: 500;
    z-index: 10;
    width: 40%;
    animation: 1.5s ${FadeInAnimation};
    &:first-child {
        padding-top: 0.15rem;
    }
    
`;

export const ListItem = styled(Link)`
    color: black;
    margin: 0.25rem 0rem;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;
    text-align: left;
    &.all{
        color: #F5CB05;
        font-weight:bold;
        text-decoration: none;
    }
    &:hover{
        color: #F5CB05;
        font-weight:bold;
        text-decoration: none;
    }
    
`;
export const Marker = styled(FaMapMarkerAlt)`
    color: #F5CB05;
`;
const HomeScreen = () => {

    const dispatch = useDispatch();
    
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList;

    
    const searchParams = new URLSearchParams(useLocation().search);

    const params = useParams();

    const {keyword} = params;
    const nutrients = searchParams.get('nutrients') ?searchParams.get('nutrients') : '';
    const pageNumber = searchParams.get('page') ?searchParams.get('page') : 1;
    const isVeg = searchParams.get('isVeg') ?searchParams.get('isVeg') : '';
    const minCal = searchParams.get('minCal') ?searchParams.get('minCal') : 0;
    const maxCal = searchParams.get('maxCal') ?searchParams.get('maxCal') : 9999;
    const category = searchParams.get('category') ?searchParams.get('category') : '';

    const [show,setShow] = useState(false);
    const [isOpenCat, setIsOpenCat] = useState(false);
    const [city,setCity] = useState("");
    const {latitude, longitude} = usePosition();

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber,nutrients,isVeg,minCal,maxCal,category));
        window.innerWidth <= 767 ? setShow(true) : setShow(false); 
        getCity(latitude,longitude).then(data => setCity(data.locality));
    }, [dispatch,latitude,longitude,keyword,pageNumber,nutrients,isVeg,minCal,maxCal,category,setShow]);


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
    return (
        <>
            {!show &&  ( <ProductSlider products = {products} loading={loading} show={show}/>)}
            <Container>
                <CategoryContainer>
                    <h3>Categorie</h3>
                    <span style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"0rem 0rem 0rem 2rem"}}>
                        
                        <TabLink className={category === ''  && 'act'} to='/'>All</TabLink>
                        <TabLink to="/search?category=wrap" className={category === 'wrap'  && 'act'}  onClick={()=>{addQuery("category","wrap");setIsOpenCat(false)}}>Wraps</TabLink>
                        <TabLink to='/search?category=sandwich' className={category === 'sandwich'  && 'act'}  onClick={()=>addQuery("category","sandwich")}>Sandwich</TabLink>
                        <TabLink to='/search?category=mini' className={category === 'mini'  && 'act'}  onClick={()=>addQuery("category","mini")}>Mini Breakfast</TabLink>
                        <TabLink to='/search?category=burger' className={category === 'burger'  && 'act'}  onClick={()=>addQuery("category","burger")}>Burgers</TabLink>
                        <TabLink to='/search?category=smoothie' className={category === 'smoothie'  && 'act'}  onClick={()=>addQuery("category","smoothie")}>Smoothies</TabLink>
                        <TabLink to='/search?category=salad' className={category === 'salad'  && 'act'}  onClick={()=>addQuery("category","salad")}>Salads</TabLink>
                        <TabLink to='/search?category=meal' className={category === 'meal'  && 'act'}  onClick={()=>addQuery("category","meal")}>Meals</TabLink>
                        <TabLink to='/search?category=oats' className={category === 'oats'  && 'act'}  onClick={()=>addQuery("category","oats")}>Oats</TabLink>
                    </span>
                </CategoryContainer>
                
                {
                    show && (
                        <>
                            <div  style=
                                {{
                                    display:"flex",
                                    width: "90vw",
                                    margin: "1rem auto 0rem auto",
                                    justifyContent:"space-between"
                                }}
                                >
                                
                                <p style={{margin:"0rem"}}><Marker/>&nbsp;{city}</p>
                                {show && <Filter isVeg={isVeg} show={show}/> }
                            </div>
                            <div style={{position:"relative",margin:"0 auto",width:"90vw"}}>
                                <SearchBox />
                            </div>
                            <ProductSlider products = {products} loading={loading} show={show}/>
                            {/* <div style=
                                {{
                                    display:"flex",
                                    width: "100vw",
                                    justifyContent:"space-between"
                                }}
                            >
                                <TabLink to='/'>
                                        Orders
                                </TabLink>
                                <TabLink to='/subscription'>
                                        Subscription
                                </TabLink>
                            </div> */}
                            <DropDownContainer>
                                <DropDownHeader onClick={()=>setIsOpenCat(!isOpenCat)}>
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
                                    
                                </DropDownHeader>
                                {
                                        isOpenCat && (
                                            <DropDownListContainer >
                                                <DropDownList>
                                                    <ListItem className={category === ''  && 'act'} to='/'>All</ListItem>
                                                    <ListItem to="/search?category=wrap" className={category === 'wrap'  && 'act'}  onClick={()=>{addQuery("category","wrap");setIsOpenCat(false)}}>Wraps</ListItem>
                                                        <ListItem to='/search?category=sandwich' className={category === 'sandwich'  && 'act'}  onClick={()=>{addQuery("category","sandwich");setIsOpenCat(false)}}>Sandwich</ListItem>
                                                    <ListItem to='/search?category=mini' className={category === 'mini'  && 'act'}  onClick={()=>{addQuery("category","mini");setIsOpenCat(false)}}>Mini Breakfast</ListItem>
                                                    <ListItem to='/search?category=burger' className={category === 'burger'  && 'act'}  onClick={()=>{addQuery("category","burger");setIsOpenCat(false)}}>Burgers</ListItem>
                                                    <ListItem to='/search?category=smoothie' className={category === 'smoothie'  && 'act'}  onClick={()=>{addQuery("category","smoothie");setIsOpenCat(false)}}>Smoothies</ListItem>
                                                    <ListItem to='/search?category=salad' className={category === 'salad'  && 'act'}  onClick={()=>{addQuery("category","salad");setIsOpenCat(false)}}>Salads</ListItem>
                                                    <ListItem to='/search?category=meal' className={category === 'meal'  && 'act'}  onClick={()=>{addQuery("category","meal");setIsOpenCat(false)}}>Meals</ListItem>
                                                    <ListItem to='/search?category=oats' className={category === 'oats'  && 'act'}  onClick={()=>{addQuery("category","oats");setIsOpenCat(false)}}>Oats</ListItem>
                                                    </DropDownList>
                                            </DropDownListContainer>
                                        )
                                    }
                            </DropDownContainer>
                        </>
                    )
                }
                <ProductsContainer>
                    {!show && <Filter isVeg={isVeg} show={show}/>}
                    {
                        loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <>
                                
                                <ProductsListScreen products={products} />
                                
                            </>
                        )
                    }
                </ProductsContainer>
                <CartContainer>
                    <Cart />
                </CartContainer>
            </Container>
            {!show && <Footer/>}
        </>
    );
}

export default HomeScreen
