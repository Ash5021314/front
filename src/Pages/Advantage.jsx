import React, {useState} from 'react'
import './Adventage.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Background1 from './images/adventages/Number-1-icon.png'
import Background2 from './images/adventages/Number-2-icon.png'
import Background3 from './images/adventages/Number-3-icon.png'
import Background4 from './images/adventages/Number-4-icon.png'
import Background5 from './images/adventages/Number-5-icon.png'
import Background6 from './images/adventages/Number-6-icon.png'
import adv from './images/adventages/adv.jpg'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Footer from '../Components/Footer'

const Advantage = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)

  let background = {
    width: '100%',
    height: 'auto',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '100px 0',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginBottom: '50px',
    fontWeight: '600',
  }
  let firstBackground = {
    backgroundImage: `url(${Background1})`,
  }
  let secondBackground = {
    backgroundImage: `url(${Background2})`,
  }
  let thirdBackground = {
    backgroundImage: `url(${Background3})`,
  }
  let fourthBackground = {
    backgroundImage: `url(${Background4})`,
  }
  let fifthBackground = {
    backgroundImage: `url(${Background5})`,
  }
  let sixthBackground = {
    backgroundImage: `url(${Background6})`,
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Бесплатный вызов замерщика</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>Заполните все поля</p>
          <Form className='flexCenter'>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Ваше имя"/>

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Ваш телефон"/>
            </Form.Group>
            <Button className="custom-bg" type="submit" onClick={handleClose}>
              вызвать
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <h2 className="headTop">Наши преимущества</h2>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <div style={{...firstBackground, ...background}} className="adv">
              <h4>Гарантия качества</h4>
              <p>Гарантия на входные и межкомнатные двери - 1 год. Дополнительно гарантируем качество монтажа, также на
                1 год.</p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div style={{...secondBackground, ...background}} className="adv">
              <h4>Доставка на следующий день</h4>
              <p>Благодаря собственному складу, выбранную дверь мы доставляем на следующий день после оформления
                заказа.</p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div style={{...thirdBackground, ...background}} className="adv">
              <h4>Собственное производство</h4>
              <p>Мы специализируемся на создании качественного и доступного во всех отношениях продукта.</p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div style={{...fourthBackground, ...background}} className="adv">
              <h4>Огромный ассортимент</h4>
              <p>Более 300 готовых решений, которые удовлетворят вкусы даже самых требовательных покупателей.</p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div style={{...fifthBackground, ...background}} className="adv">
              <h4>Вызов замерщика - бесплатно</h4>
              <p>Мастер-замерщик снимет точные размеры дверного проема для создания подробного дизайн-проекта.</p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div style={{...sixthBackground, ...background}} className="adv">
              <h4>Эксклюзивная продукция</h4>
              <p>Возможность изготовления индивидуальных заказов по чертежам и эскизам покупателя.</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6} className="flex-column flexAdventage">
            <h4>Бесплатный вызов мастера-замерщика, который снимет точные размеры дверного проема для создания
              подробного дизайн-проекта.</h4>
            <Button className="custom-bg marginAuto" onClick={handleShow}>Вызвать замерщика</Button>
            <p>*Вызов замерщика является полностью бесплатным</p>
          </Col>
          <Col xs={12} sm={6} md={6}>
            <img src={adv} alt="двери " className="w-100 mb-40"/>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  )
}

export default Advantage