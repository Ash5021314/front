import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Table from 'react-bootstrap/Table'
import { Form } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Init } from '../store/actions/auhtAction'
import { createDoor } from '../store/actions/doorsAction'
import { getHomePage } from '../store/actions/layoutAction'
import { Link, Redirect } from 'react-router-dom'

const useStyle = makeStyles(() => ({
  appBar: {
    position: 'relative',
  },
  save: {
    float: 'right',
  },
  adminDoor: {
    height: '200px',
    marginLeft: '20px',
    marginRight: '50px',
  },
  adminBackDoor: {
    height: '100px',
    marginLeft: '20px',
    marginRight: '50px',
  },
  flex: {
    display: 'flex',
  },
  flexDirection: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexDirectionEnd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-End',
  },
  titleP: {
    fontWeight: 'bold',
  },
}))

const CreateDoor = (props) => {
  const [ doorType, setDoorType ] = useState('iron')
  const [ value, setValue ] = useState({})

  const classe = useStyle()
  useEffect(() => {
    if (window.location.pathname === '/createDoor/iron') {
      setDoorType('iron')
    } else {
      setDoorType('interior')
    }
  }, [])
  const onchange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    })
  }

  const onImagePick = e => {
    setValue({
      ...value,
      img: e.target.files[0],
    })
  }

  const handleClose = async () => {
    let img = new FormData()
    img.append('img', value.img)
    img.append('category', doorType)
    delete value.img
    Object.keys(value).map(key => {
      img.append(key, value[key])
      return key
    })
    let resp = await props.createDoor(img, value)
    if (resp.success) {
      window.location.href = '/administrator'
    }
  }

  const handleCloseInsert = () => {
    Redirect('/administrator')
  }
  return (
    <>
      {'iron' === doorType ?
        (
          <>
            <AppBar className={classe.appBar}>
              <Toolbar className={classe.flexBetween}>
                <Link
                  to={{
                    pathname: '/administrator',
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    // onClick={handleCloseInsert}
                    aria-label="close"
                  >
                    <CloseIcon/>
                  </IconButton>
                </Link>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  САХРАНИТЬ
                </Button>
              </Toolbar>
            </AppBar>
            <Table striped bordered hover>
              <tbody>
              <tr>
                <td>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={classe.titleP}>Категория</Form.Label>
                    <Form.Control as="select" name="category" onChange={onchange} disabled>
                      <option name="iron">Входная</option>
                    </Form.Control>
                  </Form.Group>
                </td>
                <td>
                  <p className={classe.titleP}>Загрузить переднее фото</p>
                  <input type="file" name="frontImage" onChange={onImagePick}/>
                </td>
                <td>
                  <p className={classe.titleP}>Цвет передней двери</p>
                  <input type="text" name="frontColor" value={value.frontColor} onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Сторона двери</p>
                  <input type="text" name="side" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Зарисовка двери</p>
                  <input type="text" name="picture" onChange={onchange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={classe.titleP}>Производитель</p>
                  <input type="text" name="manufacturer" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Имя</p>
                  <input type="text" name="title" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Размер дверного блока</p>
                  <input type="text" name="doorBlockSize" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Серия</p>
                  <input type="text" name="series" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Толщина полотна (мм)</p>
                  <input type="text" name="thickness" onChange={onchange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={classe.titleP}>Толщина листа металла (мм.)</p>
                  <input type="text" name="metalSheetThickness" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Класс прочности</p>
                  <input type="text" name="strengthClass" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>
                    Значение по эксплутационным характеристикам
                  </p>
                  <input type="text" name="performanceValue" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Класс устойчивости к взлому</p>
                  <input type="text" name="burglarResistanceClass" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Количество петель</p>
                  <input type="text" name="numberOfLoops" onChange={onchange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={classe.titleP}>Противосъемы</p>
                  <input type="text" name="antiSeize" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Регулировка прижима</p>
                  <input type="text" name="clipAdjustment" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Коробка</p>
                  <input type="text" name="box" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Вылет наличника от короба</p>
                  <input type="text" name="platbandDepartureFromTheBox" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Крепление</p>
                  <input type="text" name="mount" onChange={onchange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={classe.titleP}>Утеплитель</p>
                  <input type="text" name="insulation" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Усиление замковой зоны</p>
                  <input type="text" name="castleStrengthening" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Ночная задвижка</p>
                  <input type="text" name="nightValve" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Терморазрыв</p>
                  <input type="text" name="thermalBreak" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Цинкогрунт</p>
                  <input type="text" name="zinkogrunt" onChange={onchange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={classe.titleP}>Вес двери</p>
                  <input type="text" name="doorWeight" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Цена</p>
                  <input type="text" name="price" onChange={onchange}/>
                </td>
              </tr>
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <AppBar className={classe.appBar}>
              <Toolbar className={classe.flexBetween}>
                <Link
                  to={{
                    pathname: '/administrator',
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseInsert}
                    aria-label="close"
                  >
                    <CloseIcon/>
                  </IconButton>
                </Link>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  САХРАНИТЬ
                </Button>
              </Toolbar>
            </AppBar>
            <Table striped bordered hover>
              <tbody>
              <tr>
                <td>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={classe.titleP}>Категория</Form.Label>
                    <Form.Control as="select" name="category" onChange={onchange} disabled>
                      <option name="interior">Межкомнатная</option>
                    </Form.Control>
                  </Form.Group>
                </td>
                <td>
                  <p className={classe.titleP}>Загрузить переднее фото</p>
                  <input type="file" name="frontImage" onChange={onImagePick}/>
                </td>
                <td>
                  <p className={classe.titleP}>Производитель</p>
                  <input type="text" name="manufacturer" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Имя</p>
                  <input type="text" name="title" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Размер дверного блока</p>
                  <input type="text" name="doorBlockSize" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Серия</p>
                  <input type="text" name="series" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Внутреннее наполнение</p>
                  <input type="text" name="inside" onChange={onchange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={classe.titleP}>Покрытие</p>
                  <input type="text" name="coating" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Тип остекления</p>
                  <input type="text" name="glazing" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Цена за полотно</p>
                  <input type="text" name="priceFront" onChange={onchange}/>
                </td>
                <td>
                  <p className={classe.titleP}>Цена за комплект</p>
                  <input type="text" name="fullPrice" onChange={onchange}/>
                </td>
              </tr>
              </tbody>
            </Table>
          </>
        )
      }


    </>
  )
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}
export default connect(mapStateToProps, { Init, createDoor, getHomePage })(CreateDoor)