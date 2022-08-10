import React from "react"
import { Input, Row, Col, Alert, List, Avatar } from "antd"
import { useQuery } from "@tanstack/react-query"
import { searchMedia } from "api/apiService"
import Loading from "components/Loading"
import Error from "components/Error"
import { NasaData } from "types"
import { Link } from "react-router-dom"

const { Search } = Input

const Home: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [searchTerm, setSearchTerm] = React.useState<string>("")

  const onSearch = (value: string) => {
    if (value.length === 0) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2500)
      return
    }
    setSearchTerm(value)
    refetch()
  }

  const { data, isError, isFetching, refetch } = useQuery(
    ["search", searchTerm, currentPage],
    () => searchMedia(searchTerm, currentPage),
    {
      enabled: searchTerm.length > 0,
      retry: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  if (isFetching) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Row justify='center' className='margin-1'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <Search
            placeholder='Search ...'
            size='large'
            allowClear
            enterButton
            onSearch={onSearch}
          />
          {showAlert && (
            <Alert message='Please enter your search term' type='warning' showIcon closable />
          )}
        </Col>
      </Row>
      <Row justify='center'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <List
            itemLayout='vertical'
            size='large'
            pagination={{
              pageSize: 10,
              onChange: (page) => {
                setCurrentPage(page)
              },
              current: currentPage,
              showSizeChanger: false,
              hideOnSinglePage: true,
            }}
            dataSource={data?.data?.collection?.items}
            renderItem={(item: NasaData) => {
              const nasa = item?.data?.map((nasa) => nasa)
              const href = item?.links?.map((it) => it)

              return href === undefined ? null : (
                <List.Item key={nasa[0].nasa_id}>
                  <List.Item.Meta
                    avatar={<Avatar src={href[0]?.href} size='large' shape='square' />}
                    title={<Link to={`/result/${nasa[0].nasa_id}`}>{nasa[0]?.title}</Link>}
                    description={<p className='ellipsis'>{nasa[0]?.description}</p>}
                  />
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default Home
