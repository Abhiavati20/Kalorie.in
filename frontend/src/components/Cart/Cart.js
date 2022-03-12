import React                        from 'react';
import { Link, useNavigate }                     from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message                      from '../Message/Message';
import { addToCart,removeFromCart } from '../../actions/cartActions';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Veg from './veg.png';
import NonVeg from './non-veg.png';
import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    /* width: 50%; */
    @media screen and (min-width: 320px) and (max-width: 767px){
        display: none;
    }
`;
const ItemsList = styled.div`
    width: 70%;
`;
const Item = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 0rem;
    width: 100%;
`;
const TitleAndPrice = styled.div`
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: center;
    padding: 0rem 1.25rem;
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
    margin: 0rem 0.15rem;
`;
const Minus = styled.button`
    color: black;
    background-color: white;
    font-weight:900;
    cursor: pointer;
    border: 2.5px solid #F5CB05;
    padding: 0rem 0.5rem ;
    box-shadow: 0px 0px 5px 1px #d1d1d1;
    border-radius: 5px;
    margin: 0rem 0.15rem;
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
const Cart = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const productList = useSelector((state) => state.productList)
    const { products} = productList;
         
    
    const checkoutHandler = ()=>{
        if(!products[0].isOnline)
        {
            toast.warning("Sorry We are not available for now!! ")
        }
        else{
            navigate('/login?redirect=shipping');
        }   
        
        
    }

    const handleChange = (item,action) => {
        const FilteredItem = cartItems.filter(x => x.product === item.product);
        if(action === "+")
        {
            if(FilteredItem[0].qty + 1> FilteredItem[0].availability){
                toast.warning('Sorry! product not available above that quantity')
            }
            FilteredItem[0].qty=FilteredItem[0].qty + 1 > FilteredItem[0].availability 
                            ? FilteredItem[0].availability 
                            : FilteredItem[0].qty + 1;
            dispatch(addToCart(FilteredItem[0].product,FilteredItem[0].qty));
        }
        if(action === "-")
        {
            FilteredItem[0].qty=FilteredItem[0].qty - 1 === 0 
                            ? 0 
                            : FilteredItem[0].qty - 1;
             
            FilteredItem[0].qty ?dispatch(addToCart(FilteredItem[0].product,FilteredItem[0].qty))
                            :dispatch(removeFromCart(FilteredItem[0].product));
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
                <>
                <h3 style={{textAlign:"left",padding:"1rem 5rem"}}>Cart</h3>
                <Container>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
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
                            Check Out
                        </ProceedBtn>
                    </CheckOut>
                </Container>
                </>
            )
    );
}

export default Cart
