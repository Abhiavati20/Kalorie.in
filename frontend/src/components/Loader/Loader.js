import React from 'react'
import { Spinner } from 'react-bootstrap'
import '../../bootstrap.min.css'
const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        
      }}
      variant='warning'
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader