import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Row, Layout, Col } from "antd"
import Loading from "components/Loading"

const { Header, Content, Footer } = Layout

const Home = React.lazy(() => import("pages/Home"))
const SingleResult = React.lazy(() => import("pages/SingleResult"))
const NotFound = React.lazy(() => import("pages/NotFound"))

function App() {
  return (
    <Layout className='layout full-height'>
      <Header>
        <Row justify='center'>
          <Col xs={24} sm={22} md={16} lg={12} xl={12}>
            <h1 className='header-title'>NSA Media Library</h1>
          </Col>
        </Row>
      </Header>
      <Content className='content'>
        <React.Suspense fallback={<Loading />}>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/result/:nasaId' element={<SingleResult />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </React.Suspense>
      </Content>
      <Footer className='footer'>
        We create Startups <a href='https://startupz.com'>StartupZ</a> © 2022
      </Footer>
    </Layout>
  )
}

export default App
