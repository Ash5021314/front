import React, {useState, useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './About.css'

const About = () => {
  const [about, setAbout] = useState('')

  useEffect(() => {
    setAbout('data.images.about')
  }, [])
  return (
    <div className="about">
      <Container>
        <Row>
          <Col md={6} sm={6}>
            <img key={about} src={about} alt="" className="aboutImg"/>
          </Col>
          <Col className="flex" md={6} sm={6}>
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

export default About