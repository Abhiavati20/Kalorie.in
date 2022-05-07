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

import styled                      from "styled-components";
import ProductsListScreen from './ProductsListScreen';
import { NavLink } from 'react-router-dom';
import { getCity, usePosition } from '../../components/Navbar/usePosition';
import Footer from '../../components/Footer/Footer';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    
`;
const SecondContainer = styled.div`
    display: flex;
    box-sizing: border-box;
    /* flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    flex-wrap: wrap; */
    justify-content: space-evenly;
`;
const FilterContainer = styled.div`
    position:sticky;
    top: 0rem;
    margin-bottom: 1.5rem;
    z-index: 10;
    background-color: #f5f5f5;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    @media (min-width: 768px) and (max-width: 1024px){
        margin-bottom: 0.5rem;
    }
`;
const CategoryContainer = styled.div`
    position: sticky;
    flex: 1.5;
    top: 6rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    overflow: hidden;
    background-color: white;
    align-items: center;
    padding: 1rem 0rem;
    height: 10%;
    margin: 0rem 0rem 0rem 2rem;
    border-radius: 15px;
    margin-bottom: 5rem;
    width: 15%;
    @media screen and (min-width: 320px) and (max-width: 767px){
        display: none;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        display: none;
    }
    
`;
const ProductsContainer = styled.div`
    display: flex;
    flex: 5.5;
    height: 100%;
    margin-bottom: 1rem;
    justify-content: center;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 100%;
        margin-bottom: 5rem;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        width: 50%;
    }
`;
const CartContainer = styled.div`
    position: sticky;
    top: 6rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    overflow: hidden;
    background-color: white;
    padding: 1rem 0rem;
    height: 25%;
    margin: 0rem 1rem 0rem 0rem;
    flex:3.5;
    border-radius: 15px;
    margin-bottom: 2rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        display: none;
    }
    @media (min-width: 768px) and (max-width: 1024px){
        width: 50%;
        margin: 0rem 0.5rem 0rem 0rem;
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
        <Container>
            <ProductSlider show={show} />
            <FilterContainer>
                <Filter isVeg={isVeg} show={show}  city={city}/>
            </FilterContainer>
            
            
            <SecondContainer>
                <CategoryContainer>
                    <h1>Categories</h1>
                    <div style={{textAlign:'left',display:'flex',flexDirection:'column'}}>
                        <TabLink className={category === ''  && 'act'} to='/'>All</TabLink>
                        <TabLink to="/search?category=wrap" className={category === 'wrap'  && 'act'}  onClick={()=>addQuery("category","wrap")}>Wraps</TabLink>
                        <TabLink to='/search?category=sandwich' className={category === 'sandwich'  && 'act'}  onClick={()=>addQuery("category","sandwich")}>Sandwich</TabLink>
                        <TabLink to='/search?category=mini' className={category === 'mini'  && 'act'}  onClick={()=>addQuery("category","mini")}>Mini Breakfast</TabLink>
                        <TabLink to='/search?category=burger' className={category === 'burger'  && 'act'}  onClick={()=>addQuery("category","burger")}>Burgers</TabLink>
                        <TabLink to='/search?category=smoothie' className={category === 'smoothie'  && 'act'}  onClick={()=>addQuery("category","smoothie")}>Smoothies</TabLink>
                        <TabLink to='/search?category=salad' className={category === 'salad'  && 'act'}  onClick={()=>addQuery("category","salad")}>Salads</TabLink>
                        <TabLink to='/search?category=meal' className={category === 'meal'  && 'act'}  onClick={()=>addQuery("category","meal")}>Meals</TabLink>
                        <TabLink to='/search?category=oats' className={category === 'oats'  && 'act'}  onClick={()=>addQuery("category","oats")}>Oats</TabLink>
                    </div>
                </CategoryContainer>
                <ProductsContainer>
                    {
                        loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <>
                                
                                <ProductsListScreen show={show} products={products} />
                                
                            </>
                        )
                    }
                </ProductsContainer>
                <CartContainer>
                    <Cart/>
                </CartContainer>
            </SecondContainer>
                
            {!show && <Footer />}
        </Container>
    );
}

export default HomeScreen
