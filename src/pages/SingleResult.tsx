import React from "react"
import { Col, Image, Row, Typography } from "antd"
import { LeftCircleFilled } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { searchByNasaId } from "api/apiService"
import Loading from "components/Loading"
import Error from "components/Error"
import { NasaData } from "types"

const { Title, Text } = Typography

const SingleResult: React.FC = () => {
  const { nasaId } = useParams()

  const { isLoading, isError, data, isFetching } = useQuery(
    ["nasaID", nasaId],
    () => searchByNasaId(nasaId),
    {
      refetchOnWindowFocus: false,
    },
  )

  if (isFetching || isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const { links, data: nasa } = data?.data?.collection?.items[0] as NasaData

  const date: Date = new Date(nasa[0]?.date_created)

  return (
    <>
      <Row justify='center' className='margin-1'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <Link to='/'>
            <LeftCircleFilled className='back-icon' />
          </Link>
          <Title level={3}>{nasa[0]?.title}</Title>
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          <Image width={250} src={links[0]?.href} />
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <Text>Date: {date.toLocaleString("en")}</Text>
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <Text type='secondary'>{nasa[0]?.description}</Text>
        </Col>
      </Row>
    </>
  )
}

export default SingleResult
