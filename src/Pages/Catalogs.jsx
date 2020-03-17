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
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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


const useStyle = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Catalogs = props => {
  const doorsOnPage = 12
  const [ doors, setDoors ] = useState([])
  const classes = useStyles()
  const classe = useStyle();
  let selectedCategory = useRef('interior')
  const [ currentPage, setPage ] = useState(1)
  const [ pageTotalCount, setPageTotalCount ] = useState(1)
  const [ doorsToShow, setDoorsToShow ] = useState([])
  const [age, setAge] = React.useState('');
  const inputLabel = useRef(null);

  const handleChange = event => {
    setAge(event.target.value);
  };
  useEffect(() => {
    if (!doors.length) {
      props.getDoors()
    }
  }, [ props, doors ])

  useEffect(() => {
    if (props.location.pathname === '/catalogs/iron') {
      selectedCategory.current = 'iron'
      let a =props.doors.filter(item =>{return item.category === selectedCategory.current})
      let x =  a.sort((door1,door2)=>door2.price-door1.price)
      if(age == "10"){
        let x =  a.sort((door1,door2)=>door2.price-door1.price)
        setDoors(x);
      }else if(age == "20"){
        let x =  a.sort((door1,door2)=>door1.price-door2.price)
        setDoors(x);
      }
      setDoors(x);
return
    }
    let a =props.doors.filter(item =>{return item.category === selectedCategory.current})
    let x =  a.sort((door1,door2)=>door2.priceFront-door1.priceFront)
    if(age == "10"){
      let x =  a.sort((door1,door2)=>door2.priceFront-door1.priceFront)
    setDoors(x);
    }else if(age == "20"){
      let x =  a.sort((door1,door2)=>door1.priceFront-door2.priceFront)
    setDoors(x);
    }
    setDoors(x);
  }, [ props.doors, props.location.pathname,age ])

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
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Container>
        <h2 className="headTop">Каталог</h2>
        <FormControl variant="outlined" className={classe.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Сортировка по цене
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Дорогие - Дешевые</MenuItem>
            <MenuItem value={20}>Дешевые - Дорогие</MenuItem>
          </Select>
        </FormControl>
        <CardDeck>
          {!doors.length ? (
            <h2>Loading...</h2>
          ) : (
            <Row style={{ width: '107%' }}>
              {doorsToShow.map((res, index) => {
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
