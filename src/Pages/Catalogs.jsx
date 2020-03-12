import React, { useEffect, useRef, useState } from 'react'
import Row from 'react-bootstrap/Row'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'
import Footer from '../Components/Footer'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import Interior from './Interior'
import Iron from './Iron'
import './Catalogs.css'
import { connect } from 'react-redux'
import { getDoors } from '../store/actions/doorsAction'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
}))
const Catalogs = props => {
  const doorsOnPage = 12
  const [ doors, setDoors ] = useState([])
  const classes = useStyles()
  let selectedCategory = useRef('interior')
  const [ currentPage, setPage ] = useState(1)
  const [ pageTotalCount, setPageTotalCount ] = useState(1)
  const [ doorsToShow, setDoorsToShow ] = useState([])

  useEffect(() => {
    if (!doors.length) {
      props.getDoors()
    }
  }, [ props, doors ])

  useEffect(() => {
    if (props.location.pathname === '/catalogs/iron') {
      selectedCategory.current = 'iron'
    }

    setDoors(props.doors.filter(item => item.category === selectedCategory.current))
  }, [ props.doors, props.location.pathname ])

  useEffect(() => {
    if (!doors.length) {
      return
    }

    setPageTotalCount(Math.ceil(doors.length / doorsOnPage))
  }, [ doors ])

  useEffect(() => {
    const page = (currentPage - 1) * doorsOnPage
    setDoorsToShow(doors.slice(page, page + doorsOnPage))
  }, [ currentPage, doors ])

  const onPageChange = (event, page) => {
    if (page !== currentPage) {
      setPage(page)
    }
  }

  return (
    <>
      <Container>
        <h2 className="headTop">Каталог</h2>
        <CardDeck>
          {!doorsToShow.length ? (
            <h2>Loading...</h2>
          ) : (
            <Row style={{ width: '100%' }}>
              {doorsToShow.reverse().map((res, index) => {
                if ('interior' === res.category) {
                  return <Interior key={index} res={res}/>
                }
                return <Iron key={index} res={res}/>
              })}
            </Row>
          )}
        </CardDeck>
        <div className={classes.root}>
          <Pagination count={pageTotalCount} page={currentPage} onChange={onPageChange} size="large"/>
        </div>
      </Container>
      <Footer/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    doors: state.doors,
  }
}

export default connect(mapStateToProps, { getDoors })(Catalogs)
