import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Table from 'react-bootstrap/Table'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { updateSlider, addSlide, deleteSlide } from '../store/actions/layoutAction'

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

const AdminSlider = (props) => {
  const [ selectedDoor, setSelectedDoor ] = useState(null)
  const [ slider, setSlider ] = useState([])
  const [ newSlide, setNewSlide ] = useState()

  useEffect(() => {
    setSlider(props.layout.slider)
  }, [ props.layout.slider ])

  const onUpdateSlider = async (id) => {
    await props.updateSlider(id, selectedDoor)
  }

  const onSlidePicker = async (e) => {
    setNewSlide(e.target.files[0])
  }

  const onNewSlideAdd = async () => {
    if (newSlide) {
      let img = new FormData()
      img.append('img', newSlide)
      await props.addSlide(img)
    }
  }
  const onDeleteSlide = async (id) => {
    await props.deleteSlide(id)
  }

  const onUpdatePicker = async (img) => {
    let img_form = new FormData()
    img_form.append('img', img)
    setSelectedDoor(img_form)
  }

  const classe = useStyle()
  return (
    <>
      <Table striped bordered hover>
        <thead>
        <tr className="text-light bg-dark">
          <th>Дополнительные фото</th>
          <th>Обнавить</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <input type="file" name="add_img" onChange={onSlidePicker}/>
          </td>
          <td> </td>
          <td>
            <Button variant="contained" color="primary" onClick={onNewSlideAdd}>
              Добавить
            </Button>
          </td>
        </tr>
        {
          !slider ? <></>:
          slider.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <img
                  alt="Remy Sharp"
                  src={item.url}
                  className={classe.adminDoor}
                />
                <input type="file" name="sliderImage"
                       onChange={(event) => {
                         onUpdatePicker(event.target.files[0])
                       }}
                />
              </td>
              <td>
                <Button variant="contained" color="primary" onClick={() => onUpdateSlider(item._id)}>
                  Обнавить
                </Button>
              </td>
              <td>
                <Button variant="contained" color="secondary" onClick={() => onDeleteSlide(item._id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </>
  )
}
const mapStateToProps = state => {
  return { layout: state.layout }
}

export default connect(mapStateToProps, { updateSlider, addSlide, deleteSlide })(AdminSlider)