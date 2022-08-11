import React from "react"
import { Col, Row, Spin } from "antd"

const Loading: React.FC = () => (
  <Row justify='center' className='margin-1' data-testid='loading-element'>
    <Col>
      <Spin tip='Loading...' size='large' />
    </Col>
  </Row>
)

export default Loading
