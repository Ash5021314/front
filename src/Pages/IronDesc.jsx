import React from 'react'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import OwlCarousel from 'react-owl-carousel'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const IronDesc = ({ door, onClick, backContent, style, itemImg, info, item, options }) => {
  return (
    <>
      {!door ? (<h2>Loading</h2>) :
        (<Container style={backContent}>
          <h2 className={'header'}>{door.title}</h2>
          <Row>
            <Col xs={12} md={6}>
              <div className="leftSide">
                <div className="image">
                  <div className="frontDoor">
                    <img src={door.frontImage} alt=""/>
                  </div>
                  <div className="doorParagraph">
                    <p>{door.side}</p>
                    <p>Цвет: {door.frontColor}</p>
                    <p>Рисунок: {door.picture}</p>
                  </div>
                </div>
                <div className="image">
                  <div className="frontDoor">
                    <img src={info.image} alt=""/>
                  </div>
                  <div className="doorParagraph">
                    <p>{info.side}</p>
                    <p>Цвет: {info.color}</p>
                    <p>Рисунок: {info.picture}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="price">
                <div className="rightSection">
                  <p>Цена</p>
                  <p className="lastP">{Number(door.price) + Number(info.price)} РУБ. </p>
                </div>
              </div>
              <div className="littleDoors">
                {door.otherColor.map((item, index) => {
                  return (
                    <div className={`little ${style.active === index ? 'littleChose' : ''} `}
                         onClick={() => onClick(index, item)}
                         key={index}>
                      <img src={item.image} alt=""/>
                    </div>
                  )
                })}
              </div>
            </Col>
            <Col md={2}/>
            <Col xs={8} md={8}>
              {door.moreImage.length && (
                <>
                  <p className="moreSlide">Дополнительные фотографии</p>
                  <OwlCarousel className="owl-theme" margin={70} {...options}>
                    {
                      door.moreImage.map((res, index) => {
                        return (
                          <div style={item} className="item" key={index}>
                            <img alt="" src={res.image} style={{ itemImg }}/>
                          </div>
                        )
                      })
                    }
                  </OwlCarousel>
                </>
              )}
            </Col>
            <Col md={2}/>
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
                    <p>Толщина полотна мм.</p>
                  </td>
                  <td>
                    {door.thickness}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Толщина листа металла мм.</p>
                  </td>
                  <td>
                    {door.metalSheetThickness}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Класс прочности</p>
                  </td>
                  <td>
                    {door.strengthClass}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Значение по эксплутационным характеристикам</p>
                  </td>
                  <td>
                    {door.performanceValue}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Класс устойчивости к взлому</p>
                  </td>
                  <td>
                    {door.burglarResistanceClass}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Количество петель</p>
                  </td>
                  <td>
                    {door.numberOfLoops}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Противосъемы</p>
                  </td>
                  <td>
                    {door.antiSeize}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Регулировка прижима</p>
                  </td>
                  <td>
                    {door.clipAdjustment}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Короб</p>
                  </td>
                  <td>
                    {door.box}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Вылет наличника от короба</p>
                  </td>
                  <td>
                    {door.platbandDepartureFromTheBox}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Крепление</p>
                  </td>
                  <td>
                    {door.mount}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Утеплитель</p>
                  </td>
                  <td>
                    {door.insulation}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Усиление замковой зоны</p>
                  </td>
                  <td>
                    {door.castleStrengthening}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Ночная задвижка</p>
                  </td>
                  <td>
                    {door.nightValve}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Терморазрыв</p>
                  </td>
                  <td>
                    {door.thermalBreak}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Цинкогрунт</p>
                  </td>
                  <td>
                    {door.zinkogrunt}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Вес двери</p>
                  </td>
                  <td>
                    {door.doorWeight}
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>)}
    </>
  )
}

export default IronDesc