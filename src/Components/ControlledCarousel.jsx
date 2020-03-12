import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import './ControlledCarousel.css'

import { connect } from 'react-redux'
import { getHomePage } from '../store/actions/layoutAction'

const ControlledCarousel = props => {
  const [ slide, setSlide ] = useState([])
  useEffect(() => {
    props.getHomePage()
    // setSlide(data.images.slideImages);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setSlide(props.layout.slider)
  }, [ props.layout ])

  const options = {
    items: 1,
    nav: false,
    loop: true,
    autoplay: true,
    slideBy: 1,
    dots: true,
    dotsEach: true,
    dotData: true,
    smartSpeed: 1500,
  }
  // console.log('slide', slide)
  return (
    <div className="slide">
      <h1 className="carouselHeader">Входные и межкомнатные двери</h1>
      {!slide.length ? (
        <h2>Loading...</h2>
      ) : (
        <OwlCarousel className="owl-theme" {...options}>
          {slide.map(res => {
            return (
              <div className="item" key={res._id}>
                <img alt="" src={res.url}/>
              </div>
            )
          })}
        </OwlCarousel>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    layout: state.layout,
  }
}

export default connect(mapStateToProps, { getHomePage })(ControlledCarousel)
