import React from 'react'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import OwlCarousel from 'react-owl-carousel'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const InteriorDesc = ({ door, onClick, backContent, info, slide, style, itemImg, item, options }) => {

  return (
    <>
      {!!door && (
        <Container
          style={backContent}>
          < h2
            className={'header'}> {door.title}
          </h2>
          <Row>
            <Col xs={12} md={6}>
              <div className="leftSide">
                <div className="image">
                  <div className="frontDoor">
                    <img src={info.image} alt=""/>
                  </div>
                  <div className="doorParagraph">
                    <p>Цвет: {info.color}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="price">
                <div className="rightSection">
                  <p>Цена за полотно</p>
                  <p className="lastP">{Number(door.priceFront)} РУБ. </p>
                </div>
                <div className="rightSection">
                  <p>Цена за комплект</p>
                  <p className="lastP">{Number(door.priceFront) + Number(door.fullPrice)} РУБ. </p>
                  <p className="lastP1">В комплект входит полотно, коробка, с двух сторон наличники</p>
                </div>
              </div>
              <div className="littleDoors">
                {
                  door.otherColor && door.otherColor.map((item, index) => {
                    return (
                      <div className={`little ${style.active === index ? 'littleChose' : ''} `}
                           onClick={() => onClick(index, item)}
                           key={index}>
                        <img src={item.image} alt=""/>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
            <Col xs={12} md={12}>
              {slide && slide.length && (
                <>
                  <p className="moreSlide">Дополнительные фотографии</p>
                  <OwlCarousel className="owl-theme" margin={70} {...options}>
                    {
                      slide.map((res, index) => {
                        return (
                          <div className="item" style={item} key={index}>
                            <img alt="" src={res.image} style={{ itemImg }}/>
                          </div>
                        )
                      })
                    }
                  </OwlCarousel>
                </>
              )}
            </Col>
            <Col xs={12} md={12}>
              <Table striped bordered hover className="descTable">
                <tbody>
                <tr>
                  <td>
                    <p>Производитель</p>
                  </td>
                  <td>
                    {door.manufacturer}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Размер дверного блока</p>
                  </td>
                  <td>
                    {door.doorBlockSize}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Серия</p>
                  </td>
                  <td>
                    {door.series}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Внутреннее наполнение</p>
                  </td>
                  <td>
                    {door.inside}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Покрытие</p>
                  </td>
                  <td>
                    {door.coating}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Тип остекления</p>
                  </td>
                  <td>
                    {door.glazing}
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default InteriorDesc