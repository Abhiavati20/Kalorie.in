import React from 'react'
import { Alert } from 'react-bootstrap';
import '../../bootstrap.min.css'

const Message = ({ variant, children }) => {
  return <Alert variant={variant} style={{borderRadius:"5px"}}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'dark',
}

export default Message