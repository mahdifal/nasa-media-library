import React from "react"
import { Alert } from "antd"

const Error: React.FC = () => {
  return (
    <div className='margin-1'>
      <Alert message='Error' description='A Error has occurred' type='error' showIcon />
    </div>
  )
}

export default Error
