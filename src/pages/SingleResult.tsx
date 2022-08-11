import React from "react"
import { Col, Image, Row, Tag, Typography } from "antd"
import { LeftCircleFilled } from "@ant-design/icons"
import { Link, useParams } from "react-router-dom"
import Loading from "components/Loading"
import Error from "components/Error"
import useSingleResult from "hooks/useSingleResult"
import { NasaData } from "types"

const { Title, Text } = Typography

const SingleResult: React.FC = () => {
  const { nasaId } = useParams()
  const { isLoading, isError, error, data, isFetching } = useSingleResult(nasaId)

  if (isFetching || isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error msgText={error} />
  }

  const { links: srcLink, data: nasaData } = data?.data?.collection?.items[0] as NasaData

  const dateTime: Date = new Date(nasaData[0]?.date_created)

  return (
    <>
      <Row justify='center' className='margin-1'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <Link to='/'>
            <LeftCircleFilled className='back-icon' />
          </Link>
          <Title level={3}>{nasaData[0]?.title}</Title>
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          <Image width={250} src={srcLink[0]?.href} />
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          <Text>Date: {dateTime.toLocaleString("en")}</Text>
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col>
          {nasaData[0]?.keywords?.map((key) => (
            <Tag color='cyan' key={key}>
              {key}
            </Tag>
          ))}
        </Col>
      </Row>
      <Row justify='center' className='margin-1'>
        <Col xs={24} sm={22} md={16} lg={12} xl={12}>
          <Text type='secondary'>{nasaData[0]?.description}</Text>
        </Col>
      </Row>
    </>
  )
}

export default SingleResult
