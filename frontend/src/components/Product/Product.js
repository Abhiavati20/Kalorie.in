import React          from 'react'
import { Link }                     from 'react-router-dom'
import { useDispatch,useSelector }              from 'react-redux';
// import { Card,Button,Row,Form } from 'react-bootstrap'
import { addToCart }                from '../../actions/cartActions';
import { 
    Card,
    CardBody,
    CardImage,
    ProductTitle,
    ProductDesc,
    ProductLink
} from './ProductElement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Product = ({ product }) => {
    
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHandler = () =>
    {
        let item = cartItems.filter(item => item.product === product._id)
        if(item.length === 0)
        {
            dispatch(addToCart(product._id,1));
            toast.info(`${product.name} Added to Cart`)
        }
        else{
            toast.warn(`${product.name} Already Added to Cart`)
        }
        
    }
    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Card>
            <Link to={`/product/${product._id}`}>
                <CardImage src={`${product.image}`} alt={product.name} />
            </Link>
            <CardBody>
                <ProductTitle>
                    <ProductLink style={{flex:'7'}} to={`/product/${product._id}`}>{product.name.length > 37 ? `${product.name.substr(0,36)}...`:product.name}</ProductLink>
                    <ProductLink style={{flex:'3',textAlign:'right'}} to={`/product/${product._id}`}><span style={{fontSize:'0.75rem',color: 'rgba(0,0,0,0.7)'}}>Rs {product.price}</span></ProductLink>
                </ProductTitle>
                <ProductDesc>
                    {product.calories}{' '}Kcal {' | '} {product.nutritionInfo==="lowcarbs"?"Low-Carbs":product.nutritionInfo==="highproteins"?"High Proteins":product.nutritionInfo==="balanced"&&"Balanced"}
                    <button disabled={!product.isOnline} onClick={addToCartHandler}>Add</button>
                </ProductDesc>
                
                
            </CardBody>
        </Card>
        </>
    );
};

export default Product;