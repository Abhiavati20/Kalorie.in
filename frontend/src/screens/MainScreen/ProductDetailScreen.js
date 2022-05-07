import React, { useState, useEffect }                     from 'react'
import { Link, useParams }                                from 'react-router-dom'
import { useDispatch, useSelector }                       from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating                                             from '../../components/Rating/Rating'
import Message                                            from '../../components/Message/Message'
import Loader                                             from '../../components/Loader/Loader'
import { listProductDetails }                             from '../../actions/productActions' 
import { addToCart } from '../../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import { createProductReview } from '../../actions/productActions'
import FormContainer from '../../components/FormContainer/FormContainer'
import '../../bootstrap.min.css'
const ProductDetailScreen = () => {

    const params = useParams()
    const { id } = params

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate


    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== id) {
            dispatch(listProductDetails(id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, id,successProductReview,product._id]);

    const addToCartHandler = () =>{
        dispatch(addToCart(product._id,qty));
        setMessage("Product Added To Cart!!");
        // navigate('/');
    };

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(id, {
                rating,
                comment,
            })
        );
    }
    return (
        <div
        className='p-5 bg-light p-sm-3'>
            <FormContainer>

            
            <Link className='btn btn-light my-3' style={{backgroundColor:"white"}} to='/'>
                Go Back
            </Link>
            {
                message && (<Message>{message}</Message>)
            }
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <Row className='align-items-center'>
                            <Col md={6} >
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={6} >
                                <ListGroup variant='flush'>
                                    <h4 style={{textAlign:"left",width:"85%",padding:"1rem 0rem 0rem 0.5rem",fontSize:"22px"}}>{product.name}</h4>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span style={{color:'black',fontWeight:'bold'}}>Price</span> : {' '}
                                        Rs{product.price}
                                    </ListGroup.Item>
                                    {
                                        product.calories !== 0 && 
                                        <ListGroup.Item>
                                            <span style={{color:'black',fontWeight:'bold'}}>Calories</span> :{' '}  
                                            {product.calories} Kcal
                                        </ListGroup.Item>
                                    }
                                    
                                    {
                                        product.isVeg ? (
                                            <ListGroup.Item style={{color:'green'}}>
                                                Veg
                                            </ListGroup.Item>
                                        ) : (
                                            <ListGroup.Item style={{color:'red'}}>
                                                Non-Veg
                                            </ListGroup.Item>
                                        )
                                    }
                                    
                                    <ListGroup.Item>
                                        {product.nutritionInfo==="lowcarbs"?"Low-Carbs":product.nutritionInfo==="highproteins"?"High Proteins":product.nutritionInfo==="balanced"&&"Balanced"}        
                                    </ListGroup.Item>
                                        
                                    <ListGroup.Item>
                                        <span style={{color:'black',fontWeight:'bold'}}>Description</span>:{' '} 
                                        {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={6} >
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col style={{color:'black',fontWeight:'bold'}}>Price :</Col>
                                                <Col>
                                                    <strong>Rs{product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.availability > 1 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col style={{color:'black',fontWeight:'bold'}}>Qty :</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.availability).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                                </option>
                                                            )
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                    </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item className='w-100 justify-content-center align-content-center'>
                                            <Button
                                                onClick={addToCartHandler}
                                                variant="warning"
                                                className='rounded'
                                                disabled={!product.isOnline}
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col md={6}>
                            <h4 style={{textAlign:"left",width:"85%",padding:"0.5rem 0.25rem",fontSize:"22px"}}>Reviews</h4>
                                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    {
                                        product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))
                                    }
                                    <ListGroup.Item>
                                    <h4 style={{textAlign:"left",width:"85%",fontSize:"22px"}}>Your Review</h4>
                                    {
                                        successProductReview && (
                                            <Message variant='success'>
                                                Review submitted successfully
                                            </Message>
                                        )
                                    }
                                    {loadingProductReview && <Loader />}
                                    {
                                        errorProductReview && (
                                            <Message variant='danger'>{errorProductReview}</Message>
                                        )
                                    }
                                    {
                                        userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        className='custom-select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='3'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='warning'
                                                    size='sm'
                                                    className='my-3 btn-block rounded'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message>
                                                Please <Link to='/login'>sign in</Link> to write a review{' '}
                                            </Message>
                                        )
                                    }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )
            }
            </FormContainer>
        </div>
    )
}

export default ProductDetailScreen;
