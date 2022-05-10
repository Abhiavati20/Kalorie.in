import React from 'react'
import styled from "styled-components";
import Product from '../../components/Product/Product';
const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    width: 100%;
    justify-content: center;
    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0;
    }
`;

const ProductsListScreen = ({show,products}) => {
    return (
        <Container>
            {
                products?.map(product => (
                    <Product show={show} products = {products} key={product._id} product={product} />
                ))
            }
        </Container>
    )
}

export default ProductsListScreen
