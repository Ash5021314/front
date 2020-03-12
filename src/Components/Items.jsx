import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import './Items.css'
import CardDeck from 'react-bootstrap/CardDeck'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDoors } from '../store/actions/doorsAction'

const Items = (props) => {
  const [ ironDoors, setIronDoors ] = useState([])
  const [ interiorDoors, setInteriorDoors ] = useState([])

  useEffect(() => {
    props.getDoors()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.doors.reverse()
    setIronDoors(props.doors.filter(({ category }) => category === 'iron').slice(0, 4))
    setInteriorDoors(props.doors.filter(({ category }) => category === 'interior').slice(0, 4))
  }, [ props.doors ])

  return (
    <>
      <Container>
        <h2 className="prodHeader"> Входные двери</h2>
        <CardDeck>
          {!ironDoors.length ? <h2>Loading...</h2> : (
            <Row style={{ width: '110%' }}>
              {
                ironDoors.map((res, index) => {
                  return (<Col xs={6} md={3} key={index}>
                      <Card>
                        <div className="flip-box">
                          <div className="flip-box-inner">
                            <div className="flip-box-front">
                              <Card.Img variant="top" src={res.frontImage}
                                        style={{ height: '100%' }}/>
                            </div>
                            <div className="flip-box-back">
                              <Card.Img variant="top" src={res.otherColor[0] ? res.otherColor[0].image : 'not found'}
                                        style={{ height: '100%' }}/>
                            </div>
                          </div>
                        </div>
                        <Card.Body className="alignCenter">
                          <Card.Title>{res.title}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                          <div className="text-muted alignCenter ">{res.price} <span>р.</span></div>
                        </Card.Footer>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
          )}
          <Button variant="info" className="buttonCenter"><Link to="catalogs/iron2"
                                                                style={{ color: 'white', textDecoration: 'none' }}>увидеть
            больше</Link></Button>
        </CardDeck>
        <h2 className="prodHeader">Межкомнатные двери</h2>
        <CardDeck>
          {!interiorDoors.length ? <h2>Loading...</h2> : (
            <Row>
              {
                interiorDoors.map((res, index) => {
                  return (<Col xs={6} md={3} key={index}>
                      <Card>
                        <div className="flip-box">
                          <div className="flip-box-">

                            <div className="flip-box-">
                              <Card.Img variant="top" src={res.frontImage}
                                        style={{ height: '100%' }}/>
                            </div>
                          </div>
                        </div>
                        <Card.Body className="alignCenter">
                          <Card.Title>{res.title}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                          <div className="text-muted alignCenter ">{res.priceFront} <span>р.</span></div>
                        </Card.Footer>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
          )}
          <Button variant="info" className="buttonCenter"><Link to="catalogs/iron"
                                                                style={{ color: 'white', textDecoration: 'none' }}>увидеть
            больше</Link></Button>
        </CardDeck>
      </Container>

    </>
  )
}

const mapStateToProps = state => {
  return {
    doors: state.doors,
  }
}

export default connect(mapStateToProps, { getDoors })(Items)