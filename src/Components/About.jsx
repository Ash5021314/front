import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './About.css'
import { connect } from 'react-redux'
import { getHomePage } from '../store/actions/layoutAction'

const About = (props) => {
  const [ about, setAbout ] = useState('')
  useEffect(() => {
    props.getHomePage()
  }, [])

  useEffect(() => {
    if (props.layout.slider) {
      setAbout(props.layout.about_image)
    }
  }, [ props.layout ])
  return (
    <div className="about">
      <Container>
        <Row>
          <Col md={6} sm={6}>
            <div className="aboutImg">
              <img key={about} src={about} alt=""/>
            </div>
          </Col>
          <Col className={"flex,about"} md={6} sm={6}>
            <h2>О нас</h2>
            <p>VANDOORS - дистрибьютор по продаже входных и межкомнатных дверей.</p>
            <div className="line"/>
            <p>«Двери Регионов» - торгово-производственная компания, начавшая свою деятельность в 2008 году, сегодня
              является одним из лидирующих поставщиков межкомнатных и входных дверей на московском рынке.</p>
            <p>Целью Группы Компаний «Двери Регионов» является полноценное и комплексное удовлетворение потребности
              людей при приобретении дверей, создание качественного и доступного во всех отношениях продукта.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    layout: state.layout,
  }
}

export default connect(mapStateToProps, { getHomePage })(About)
