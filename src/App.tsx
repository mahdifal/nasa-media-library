import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Row, Layout, Col } from "antd"
import Home from "pages/Home"
import SingleResult from "pages/SingleResult"
import NotFound from "pages/NotFound"

const { Header, Content, Footer } = Layout

function App() {
  return (
    <Layout className='layout'>
      <Header>
        <Row justify='center'>
          <Col span={4}>
            <h1 style={{ color: "#fff" }}>NSA Media Library</h1>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/result/:slug' element={<SingleResult />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default App
