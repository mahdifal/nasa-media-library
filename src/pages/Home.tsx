import React from "react"
import { Input, Row, Col, Alert, List, Avatar, InputNumber, Space, Button } from "antd"
import Loading from "components/Loading"
import Error from "components/Error"
import useSearch from "hooks/useSearch"
import { NasaData } from "types"
import { Link } from "react-router-dom"

const { Search } = Input

const Home: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true)

  const {
    data,
    isError,
    error,
    isFetching,
    currentPage,
    setCurrentPage,
    showAlert,
    setShowAlert,
    setSearchTerm,
    refetch,
    setYearStart,
    setYearEnd,
  } = useSearch()

  const onSearch = (value: string) => {
    if (value.length === 0) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2500)
      return
    }
    setSearchTerm(value)
    refetch()
  }

  const toggle = () => {
    setDisabled(!disabled)
  }

  const onChangeStart = (value: string) => setYearStart(value)

  const onChangeEnd = (value: string) => setYearEnd(value)

  if (isFetching) {
    return <Loading />
  }

  if (isError) {
    return <Error msgText={error} />
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
            data-testid='search'
          />
          {showAlert && (
            <Alert message='Please enter your search term' type='warning' showIcon closable />
          )}
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          <Space>
            <InputNumber disabled={disabled} onChange={onChangeStart} placeholder='Start Year' />
            <InputNumber disabled={disabled} onChange={onChangeEnd} placeholder='End Year' />
          </Space>
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          {!disabled ? (
            <span>Please enter start year and end year.</span>
          ) : (
            <span>Enable / Disable Year Search</span>
          )}
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          <Button onClick={toggle} type='primary'>
            Toggle Year
          </Button>
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
            // @ts-ignore
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
