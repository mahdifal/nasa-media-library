import React from "react"
import { Alert, Col, Row } from "antd"

type ErrorProps = {
  msgText: object | unknown
}

const Error: React.FC<ErrorProps> = ({ msgText }) => {
  return (
    <Row justify='center' className='margin-1' data-testid='error-element'>
      <Col xs={24} sm={22} md={16} lg={12} xl={12}>
        <Alert message='Error' description={(msgText as Error).toString()} type='error' showIcon />
      </Col>
    </Row>
  )
}

export default Error
