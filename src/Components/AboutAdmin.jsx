import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { updateAboutImage } from '../store/actions/layoutAction'

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
const AboutAdmin = (props) => {

  let [ img, setImg ] = useState('')
  useEffect(() => {
    setImg(props.layout.about_image)
  }, [ props.layout.about_image ])
  useEffect(() => {
    setImg(props.layout.about_image)
  }, [ props.layout.about_image ])
  const classe = useStyle()

  const onChange = async (e) => {
    setImg(
      e.target.files[0],
    )
  }

  const sendImage = async () => {
    let new_img = new FormData()
    new_img.append('img', img)
    await props.updateAboutImage(new_img)
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
        <tr className="text-light bg-dark">
          <th>Имя</th>
          {/*<th>Обнавить</th>*/}
          {/*<th>Удалить</th>*/}
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <img
              alt="Remy Sharp"
              src={img}
              className={classe.adminDoor}
            />
            <input type="file" name="img" onChange={onChange}/>
          </td>
          {/*<td>*/}
          {/*  <Button variant="contained" color="primary" onClick={sendImage}>*/}
          {/*    Обнавить*/}
          {/*  </Button>*/}
          {/*</td>*/}
          {/*<td>*/}
          {/*  <Button variant="contained" color="secondary">*/}
          {/*    Удалить*/}
          {/*  </Button>*/}
          {/*</td>*/}
        </tr>


        </tbody>
      </Table>
    </>
  )
}

const mapStateToProps = state => {
  return {
    layout: state.layout,
  }
}

export default connect(mapStateToProps, { updateAboutImage })(AboutAdmin)
