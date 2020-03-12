import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const Interior = ({ res }) => {

  return (
    <Col
      xs={6}
      md={3}
    >
      <Link to={`/DoorDesc/${res._id}`}>
        <Card className="mb-5">
          <div className="flipBox fixed-item">
            <div className="someFlipInner">
              <div className="someFlip">
                <Card.Img
                  variant="top"
                  src={res.frontImage}
                  style={{ height: '100%' }}
                  alt={'a'}
                />
              </div>
            </div>
          </div>
          <Card.Body className="alignCenter">
            <Card.Title style={{ color: 'grey', textDecoration: 'none' }}>{res.title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <div className="text-muted alignCenter ">
              {res.priceFront} <span>р.</span>
            </div>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}

export default Interior