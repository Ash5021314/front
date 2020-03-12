import React from 'react'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Iron from './images/catalog/iron.png'
import Interior from './images/catalog/interier.png'
import './Catalog.css'
import Footer from '../Components/Footer'

const Catalog = () => {
  return (
    <>
      <Container>
        <h2 className="headTop">Каталог</h2>
        <Row>
          <Col xs={5} sm={5} md={5}>
            <Link to="/catalogs/iron">
              <div className="w-100 imageHover">
                <img src={Iron} alt="" className="w-100 image"/>
                <div className="middle">
                  <div className="text">входные двери</div>
                </div>
              </div>
            </Link>
          </Col>
          <Col xs={2} sm={2} md={2}/>
          <Col xs={5} sm={5} md={5}>
            <Link to="/catalogs/iron2">
              <div className="w-100 imageHover">
                <img src={Interior} alt="" className="w-100 image"/>
                <div className="middle">
                  <div className="text">межкомнатные двери</div>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  )
}

export default Catalog
