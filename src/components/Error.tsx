import React from "react"
import { Alert } from "antd"

type ErrorProps = {
  msgText: object | unknown
}

const Error: React.FC<ErrorProps> = ({ msgText }) => {
  return (
    <div className='margin-1'>
      <Alert message='Error' description={(msgText as Error).toString()} type='error' showIcon />
    </div>
  )
}

export default Error
