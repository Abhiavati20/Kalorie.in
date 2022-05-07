import React, {useEffect, useState} from 'react';
import { Link, useNavigate }                     from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message                      from '../../components/Message/Message';
import { addToCart,removeFromCart } from '../../actions/cartActions';
import { listTopProducts } from '../../actions/productActions'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Veg from './veg.png';
import NonVeg from './non-veg.png';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader';

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    background-color: white;
    height: 100%;
    overflow: hidden;
    @media screen and (min-width: 320px) and (max-width: 767px){
        background-color: white;
        height: 100vh;
    }
    /* width: 50%; */
`;
const ItemsList = styled.div`
    width: 100%;
`;
const Item = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.5rem 1.5rem;
`;
const TitleAndPrice = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    padding: 0rem 0.75rem;
`;
const ProductLink =styled(Link)`
    color: black;
    word-wrap: break-word;
    background: none;
    text-decoration: none;
    margin: 0.5rem 0rem;
    cursor: pointer;
`;
const Plus = styled.button`
    color: black;
    background-color: white;
    font-weight:900;
    cursor: pointer;
    border: 2px solid #F5CB05;
    padding: 0rem 0.5rem ;
    box-shadow: 0px 0px 5px 1px #d1d1d1;
    border-radius: 5px;
    margin: 0rem 0.25rem;
`;
const Minus = styled.span`
    color: black;
    background-color: white;
    font-weight:900;
    cursor: pointer;
    border: 2px solid #F5CB05;
    padding: 0rem 0.5rem ;
    box-shadow: 0px 0px 5px 1px #d1d1d1;
    border-radius: 5px;
    margin: 0rem 0.25rem;
`;

const CheckOut = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubTotal = styled.p`
    text-align: center;
    margin: 1rem auto;
`;

const ProceedBtn = styled.button`
    width: 90vw;
    padding: 0.5rem 5rem;
    border: none;
    outline: none;
    background-color: #F5CB05;
    color: white;
    font-weight: 800;
    border-radius:3px;
    cursor: pointer;
    &.active{
        outline: none;
    }
`;

const Info = styled.div`
    margin: 2rem;
`;

const ProductsContainer = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    width: 100%;
    /* padding-bottom: rem; */
    
    white-space: nowrap;
    background-color: #f5f5f5;
    &::-webkit-scrollbar {
        display: none;
    }
    @media screen and (min-width: 320px) and (max-width: 767px){
        padding-bottom: 1rem;
    }
`;

export const Card = styled.div`
    margin:0.5rem 2rem;
    border-radius: 10px;
    background-color: white;
    width: 35%;
    box-shadow: 0px 0px 20px 2px #d1d1d1;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 55%;
        
        margin: 0.5rem 0.55rem;
    }
`;

export const CardImage = styled.img`
    top: 0;
    width: 100%;
    height: 180px;
    border-radius: 5px;
    @media screen and (min-width: 320px) and (max-width: 767px){
        width: 100%;
        height: 120px;
        margin: 0;
    }
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 320px) and (max-width: 767px){
    }
    
`;
export const ProductTitle = styled.div`
    display: flex;
    width: 100%;
    height: 8vh;
    margin: 0.15rem auto;
    justify-content: space-around;
    padding: 0rem 0rem;
    @media screen and (min-width: 320px) and (max-width: 767px){
        height: 5vh;
        margin: 0rem auto;
        padding: 0rem auto;
    }
`;
export const ProductDesc = styled.div`
    width:100%;
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
        /* height: 16vh; */
        padding: 0.15rem 0.15rem;
        margin: 0rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > button{
            /* height: 1.5rem; */
            height: 2rem;
            margin: 0rem auto 0.2rem auto;
            margin-bottom: 0.6rem;
        }
    }
`;

export const ProductLink2 =styled(Link)`
    color: black;
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
    }

`;


const Cart = () => {
    
    const dispatch = useDispatch();

    
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const productTopRated = useSelector((state) => state.productList)
    const { loading, error, products } = productTopRated;
    const [FilteredItem,setFilteredItem] = useState([])
        useEffect(() => {
        var result = products.filter(function (o1) {
            return !cartItems.some(function (o2) {
                return o1._id === o2.product; // return the ones with equal id
           });
        });
        setFilteredItem([...result])
        dispatch(listTopProducts())        
    }, [dispatch,listTopProducts])
    const checkoutHandler = ()=>{
        if(products && !products[0]?.isOnline)
        {
            toast.warning("Sorry We are not available for now!! ")
        }
        else{
            navigate('/login?redirect=shipping');
        }
        
        
    }
    const addToCartHandler = (product) =>
    {
        // rating && 

        let qty = 0;
        cartItems.filter(item =>{
            if(product._id === item.product){
                qty = item.qty;
                         
            }
            return qty;   
        })
        qty = qty + 1 > product.availability ? product.availability : qty + 1;
        if(qty + 1 > product.availability){
            toast.info('Sorry! product not available above that quantity')
        }
        dispatch(addToCart(product._id,qty));
    }
    const handleChange = (item,action) => {
        const FilteredItems = cartItems.filter(x => x.product === item.product);
        if(action === "+")
        {
            if(FilteredItems[0].qty + 1> FilteredItems[0].availability){
                toast.warning('Sorry! product not available above that quantity')
            }
            FilteredItems[0].qty=FilteredItems[0].qty + 1 > FilteredItems[0].availability 
                            ? FilteredItems[0].availability 
                            : FilteredItems[0].qty + 1;
            
            dispatch(addToCart(FilteredItems[0].product,FilteredItems[0].qty));
        }
        if(action === "-")
        {
            FilteredItems[0].qty=FilteredItems[0].qty - 1 === 0 
                            ? 0 
                            : FilteredItems[0].qty - 1;
             
            FilteredItems[0].qty ?dispatch(addToCart(FilteredItems[0].product,FilteredItems[0].qty))
                            :dispatch(removeFromCart(FilteredItems[0].product));
        }
    }
    return (
        cartItems.length===0 ? (
                <Info>
                    <Message >
                        Your Cart is Empty!!
                    </Message>
                </Info>
            ) : (
                <Container style={{height:"100vh",marginBottom:'5rem'}}>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}

                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <h4 style={{textAlign:"left",width:"85%",padding:"1rem 0.25rem",borderBottom:"1px solid rgba(0, 0, 0, 0.125)",fontSize:"22px"}}>Cart</h4>
                    <ItemsList>
                        {
                            cartItems.map(item => (
                                <Item key={item.product}>

                                        {
                                            item.isVeg ? (
                                                <img src={Veg} width="28px" height="28px" style={{objectFit:'contain'}} alt="veg" />
                                            
                                            ) : (
                                                <img src={NonVeg} width="28px" height="28px" style={{objectFit:'contain'}} alt="nonveg" />
                                            )
                                        }
                                   
                                    <TitleAndPrice >
                                        <ProductLink  to={`/product/${item.product}`}>
                                            { item.name }
                                        </ProductLink>
                                        <h6 style={{opacity:"0.5", }}>Rs {item.price * item.qty} </h6>
                                        
                                    </TitleAndPrice>
                                    <span style={{display:"flex",margin:"0rem 0.5rem"}}>
                                            <Minus onClick={()=>handleChange(item,"-")}>-</Minus>
                                                &nbsp;{item.qty}&nbsp;
                                            <Plus onClick={()=>handleChange(item,"+")}>+</Plus>
                                    </span>
                                    
                                </Item>
                            ))
                        }
                    </ItemsList>
                    <hr style={{width:"85%",fontWeight:"bolder" }} />
                    <CheckOut>
                        <SubTotal>
                                Subtotal&nbsp;({cartItems.reduce((acc, item) => acc + item.qty, 0)})&nbsp;items
                        </SubTotal>
                        <ProceedBtn onClick={checkoutHandler}>
                            Select Address
                        </ProceedBtn>
                    </CheckOut>
                    <p style={{textAlign:"left",width:"85%",padding:"1rem 0.25rem",borderBottom:"0.5px solid rgba(0, 0, 0, 0.125)",fontSize:"16px"}}>Must Try! 👇 </p>
                    <ProductsContainer>
                    
                        {
                            loading ? (
                                <Loader/>
                            ) : error ? (
                                <Message>{error}</Message>
                            ) : (FilteredItem && FilteredItem?.length !== 0) ? (
                                FilteredItem.map(product =>(
                                    <Card key={product._id}>
                                       
                                        <Link to={`/product/${product._id}`}>
                                            <CardImage src={`${product.image}`} alt={product.name} />
                                        </Link> 
                                        <CardBody>
                                            <ProductTitle >
                                                <ProductLink2 style={{flex:'7'}} to={`/product/${product._id}`}>{product.name.substr(0,20)}{'...'}</ProductLink2>
                                                <ProductLink2 style={{flex:'3',textAlign:'right'}} to={`/product/${product._id}`}>Rs {product.price}</ProductLink2>
                                            </ProductTitle>
                                            <ProductDesc>
                                                {product.calories}{' '}Kcal {' | '} {product.nutritionInfo==="lowcarbs"?"Low-Carbs":product.nutritionInfo==="highproteins"?"High Proteins":product.nutritionInfo==="balanced"&&"Balanced"}
                                                <button disabled={!product.isOnline} onClick={()=>addToCartHandler(product)}>Add</button>
                                            </ProductDesc>
                                            
                                            
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <div style={{width:'90%',margin:'auto'}}>
                                    <Message variant='info' >Your Cart Is Matching With Suggested Product</Message>
                                </div>
                            )
                        }
                    </ProductsContainer>
                </Container>
            )
    );
}

export default Cart
