import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import './Brends.css'
// import brends from '../data'
import { connect } from 'react-redux'
import { getHomePage } from '../store/actions/layoutAction'

const Brends = (props) => {
  const [ brend, setBrend ] = useState([])
  useEffect(() => {
    props.getHomePage()
    // setSlide(data.images.slideImages);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setBrend(props.layout.brend)
  }, [ props.layout ])
  const options = {
    items: 6,
    nav: false,
    loop: true,
    autoplay: true,
    slideBy: 1,
    dots: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      300: {
        items: 3,
      },

      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  }

  return (
    <>
      <h2 className="prodHeader">Наши Партнеры</h2>
      <p className='alignCenter'>Мы сотрудничаем только с проверенными брендами.</p>
      <OwlCarousel className="owl-theme" margin={70} {...options}>
        {
          brend.map((item, index) => {
            return (
              <div className="item" key={index}>
                <img
                  src={item.url}
                  alt="brands"/>
              </div>
            )
          })
        }
      </OwlCarousel>
    </>
  )
}
const mapStateToProps = state => {
  return {
    layout: state.layout,
  }
}

export default connect(mapStateToProps, { getHomePage })(Brends)
