import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const Iron = ({ res }) => {
  return (
    <Col
      xs={6}
      md={3}
    >
      <Link to={`/DoorDesc/${res._id}`}>
        <Card className="mb-5">
          <div className="flip-box">
            <div className="flip-box-inner">
              <div className="flip-box-front">
                <Card.Img
                  variant="top"
                  src={res.frontImage}
                  style={
                    {
                      height: '100%',
                    }
                  }
                />
              </div>
              {!!res.otherColor.length && (
                <div className="flip-box-back">
                  <Card.Img
                    variant="top"
                    src={res.otherColor[0].image}
                    style={{ height: '100%' }}
                    alt={'a'}
                  />
                </div>
              )}
            </div>
          </div>
          <Card.Body className="alignCenter">
            <Card.Title style={{ color: 'grey', textDecoration: 'none' }}>{res.title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <div className="text-muted alignCenter ">
              {res.price} <span>р.</span>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}

export default Iron