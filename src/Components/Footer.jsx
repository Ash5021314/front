import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faMapMarked, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import ListGroup from 'react-bootstrap/ListGroup'

const Footer = () => {
  return (
    <>
      <footer className="footer backGround">
        <Container>
          <Row>
            <Col xs={6} md={3}>
              <p className="footer_header"><span>О нас</span></p>
              <h3>VANDOORS</h3>
              <p className={'query'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            </Col>
            <Col xs={6} md={2}>
              <p className="footer_header"><span>Ссылки</span></p>

              <ListGroup variant="flush">
                <ListGroup.Item className="padding0"><span><FontAwesomeIcon icon={faAngleRight}/></span> <span> О Компании</span></ListGroup.Item>
                <ListGroup.Item className="padding0"><span><FontAwesomeIcon icon={faAngleRight}/></span>
                  <span> Бренди</span> </ListGroup.Item>
                <ListGroup.Item className="padding0"><span><FontAwesomeIcon icon={faAngleRight}/></span> <span> Наши преимущества</span></ListGroup.Item>
                <ListGroup.Item className="padding0"><span><FontAwesomeIcon icon={faAngleRight}/></span>
                  <span> Каталог</span></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={6} md={3}>
              <p className="footer_header"><span>Обратная связь </span></p>
              <ListGroup>
                <ListGroup.Item><span className="footerSpan"><FontAwesomeIcon icon={faMapMarked}/></span><span>г. Москва, Открытое шоссе, дом 9, стр. 11</span></ListGroup.Item>
                <ListGroup.Item><span className="footerSpan"><FontAwesomeIcon icon={faPhone}/></span><span>8 (901) 55-44-000  <br/>  8 (919) 99-44-000</span></ListGroup.Item>
                <ListGroup.Item><span className="footerSpan"><FontAwesomeIcon icon={faEnvelope}/></span><span>г. Москва, Открытое шоссе, дом 9, стр. 11</span></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={6} md={4}>
              <p className="footer_header"><span>Рабочие дни</span></p>
              <ListGroup>
                <ListGroup.Item
                  className="fz14"><span>С понедельника > До пятницы:</span><span>09։00 - 18։00</span></ListGroup.Item>
                <ListGroup.Item className="fz14"><span>В субботу:</span><span>09։00 - 13։00</span></ListGroup.Item>
                <ListGroup.Item className="fz14"><span>В воскресенье:</span><span>Не работаем </span></ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <hr style={{backgroundColor: '#ffffff'}}/>
          <div className="copy"><span dangerouslySetInnerHTML={{'__html': '&copy;'}}/> <span> Все права защищены</span>
          </div>

        </Container>
      </footer>
    </>
  )
}

export default Footer