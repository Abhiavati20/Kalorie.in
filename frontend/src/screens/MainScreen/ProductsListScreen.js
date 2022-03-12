import React from 'react'
import styled from "styled-components";
import Product from '../../components/Product/Product';
const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    /* flex-: inherit; */
    flex-shrink: inherit;
    justify-content: center;
    
    width: 100%;
    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0;
    }
`;

const ProductsListScreen = ({products}) => {
    return (
        <Container>
            {
                products.map(product => (
                    <Product key={product._id} product={product} />
                ))
            }
        </Container>
    )
}

export default ProductsListScreen
