import React from "react"
import { Col, Row, Space, Spin } from "antd"

const Loading: React.FC = () => (
  <Row justify='center' className='margin-1'>
    <Col>
      <Spin tip='Loading...' size='large' />
    </Col>
  </Row>
)

export default Loading
