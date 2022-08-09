import React from "react"
import { Input, Row, Col } from "antd"

const { Search } = Input

const onSearch = (value: string) => console.log(value)

const Home: React.FC = () => {
  return (
    <Row justify='center' className='search'>
      <Col xs={24} sm={22} md={16} lg={12} xl={12}>
        <Search placeholder='Search ...' size='large' allowClear enterButton onSearch={onSearch} />
      </Col>
    </Row>
  )
}

export default Home
