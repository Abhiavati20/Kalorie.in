import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../bootstrap.min.css'
const SearchBox = ({width1}) => {
    const [keyword, setKeyword] = useState('');

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim())
        {
            navigate(`/search/${keyword}`);
        }
        else
        {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler}>
            <Form.Control
                type='text'
                name={keyword}
                onChange = {(e) => setKeyword(e.target.value)}
                placeholder={keyword? keyword:'Search ...'}
                // className='my-2  w-100'
                style={{backgroundColor:"white",marginTop:window.innerWidth > 767 ?'0.5rem':'0rem',width:width1?width1:null, borderRadius:"5px", boxShadow: "0px 0px 10px 1px #e1e1e1", height: "38px"}}
            ></Form.Control>        
        </Form>
    )
}

export default SearchBox
