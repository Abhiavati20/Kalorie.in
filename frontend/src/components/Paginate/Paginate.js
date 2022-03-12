import React from 'react'
import { Pagination } from 'react-bootstrap'
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  
  return (
    pages > 1 && (
      <Pagination className='d-flex justify-content-start mx-4'  size='sm'>
        {[...Array(pages).keys()].map((x) => (
          
            <Pagination.Item 
            key={x}
            style={{background:'#F5CB05'}}
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}?page=${x + 1}`
                  : `/search?page=${x + 1}`
                : `/admin/productlist/${x + 1}`
            } active={x + 1 === page} activeLabel=''>{x + 1}</Pagination.Item>
        ))}
      </Pagination>
    )
  )
}

export default Paginate