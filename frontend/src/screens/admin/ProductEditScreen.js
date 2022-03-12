
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import '../../bootstrap.min.css';
const ProductEditScreen = () => {
  const params = useParams();
  const { id : productId} = params

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [isVeg, setIsVeg] = useState(true)
  const [image, setImage] = useState('')
  const [calories, setCalories] = useState(0)
  const [category, setCategory] = useState('')
  const [availability, setAvailability] = useState(0)
  const [nutritionInfo, setNutritionInfo] = useState([])
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setIsVeg(product.isVeg)
        setNutritionInfo(product.nutritionInfo)
        setCalories(product.calories)
        setCategory(product.category)
        setAvailability(product.availability)
        setDescription(product.description)
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset","kalorie");
    formData.append("cloud_name","dkpcnandz");
    setUploading(true)

    try {

      const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dkpcnandz/image/upload', {
        method: "POST",
        body: formData,
      })
      const data = await cloudRes.json()
      setImage(data.url)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        isVeg,
        calories,
        nutritionInfo,
        category,
        description,
        availability,
      })
    )
  }

  return (
    <div>
      
      <FormContainer>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <h4>Edit Product</h4>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                type='file'
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter brand'
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label as='p'>Select Nutrition</Form.Label>
                
                    <Form.Control
                        as='select'
                        className='custom-select'
                        value={nutritionInfo}
                        onChange={(e)=>setNutritionInfo(e.target.value)}
                    >
                            <option  value="">
                                Select Nutrition
                            </option>
                            <option  value="highproteins">
                                High Proteins
                            </option>
                            <option  value="lowcarbs">
                                Low-Carbs
                            </option>
                            <option  value="balanced">
                                Balanced
                            </option>
                        </Form.Control>
                
            </Form.Group>

            <Form.Group>
            <Form.Check
              type='checkbox'
              label='Is Veg'
              checked={isVeg}
              onChange={(e) => setIsVeg(e.target.checked)}
            ></Form.Check>
            </Form.Group>
            <Button type='submit' className='my-3 rounded' variant='warning'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen