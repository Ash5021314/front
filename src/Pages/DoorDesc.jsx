import React, { useEffect, useState } from 'react'
import './DoorDesc.css'
import Footer from '../Components/Footer'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import IronDesc from './IronDesc'
import { connect } from 'react-redux'
import { getDoors } from '../store/actions/doorsAction'
import InteriorDesc from './InteriorDesc'

const DoorDesc = (props) => {
  const [ selectedDoor, setSelectedDoor ] = useState()
  const [ style, setStyle ] = useState({
    active: 0,
  })
  const [ info, setInfo ] = useState()

  let url = props.location.pathname
  let res = url.split('/')
  let result = res[res.length - 1]
  useEffect(() => {
    if (!selectedDoor) {
      props.getDoors()
    }
  }, [ props, selectedDoor ])

  useEffect(() => {
    const door = props.doors.find(item => item._id === result)
    if (!door) {
      return
    }
    setSelectedDoor(door)
    setInfo({ ...door.otherColor[0] })
  }, [ props.doors, result ])

  const options = {
    items: 3,
    nav: false,
    loop: true,
    autoplay: true,
    slideBy: 1,
    dots: false,
    smartSpeed: 1000,
  }
  const back = {
    background: '#EDEDED',
    position: 'absolute',
    width: '100%',
  }
  const backContent = {
    background: 'white',
    marginTop: '100px',
    paddingBottom: '50px',
  }
  const item = {
    height: '200px',
    width: '100px',
    margin: '20px 70px',
  }
  const itemImg = {
    height: '100%',
  }
  const handleClick = (index) => {
    setStyle({
      active: index,
    })
  }

  const getInfo = (item) => {
    setInfo({ ...item })
  }

  const onClick = (index, item) => {
    handleClick(index)
    getInfo(item)
  }

  return (
    <div style={back}>
      {!!selectedDoor ? (
        <>
          {('interior' === selectedDoor.category) ? (
            <InteriorDesc
              door={selectedDoor}
              onClick={onClick}
              backContent={backContent}
              info={info}
              style={style}
              itemImg={itemImg}
              item={item}
              options={options}
            />
          ) : (
            <IronDesc
              door={selectedDoor}
              onClick={onClick}
              backContent={backContent}
              info={info}
              style={style}
              itemImg={itemImg}
              item={item}
              options={options}
            />
          )
          }
        </>
      ) : (
        <div>There is no selected door</div>
      )}
      <Footer/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    doors: state.doors,
  }
}

export default connect(mapStateToProps, { getDoors })(DoorDesc)
