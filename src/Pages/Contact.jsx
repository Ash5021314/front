import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import './Contact.css'
import Footer from '../Components/Footer'

const Contact = () => {

  return (
    <>
      <h2 className="headTop">Наше расположение</h2>
      <Container>
        <Row>
          <Col xs={12} md={5}>
            <div className="flexContact">
              <h3>Где мы находимся?</h3>
              <p>г. Москва Открытое шоссе, дом 9, стр. 11</p>
            </div>
          </Col>
          <Col xs={12} md={7} className={'mb-50  iframeclass'}>
            <iframe
              title={'unique'}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa51e9e339159f0e01dc8d0592705c49af35e75379805d72a543d046c8314b566&amp;source=constructor"
              width="100%" height="421" frameBorder="0"/>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  )
}

export default Contact