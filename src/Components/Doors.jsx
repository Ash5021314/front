import React, { useEffect, useState } from 'react'
import { makeStyles }                 from '@material-ui/core/styles'
import Card                           from '@material-ui/core/Card'
import CardActionArea                 from '@material-ui/core/CardActionArea'
import CardActions                    from '@material-ui/core/CardActions'
import CardContent                    from '@material-ui/core/CardContent'
import CardMedia                      from '@material-ui/core/CardMedia'
import Typography                     from '@material-ui/core/Typography'
import Grid                        from '@material-ui/core/Grid'
import Dialog                         from '@material-ui/core/Dialog'
import AppBar                         from '@material-ui/core/AppBar'
import Toolbar                        from '@material-ui/core/Toolbar'
import IconButton                     from '@material-ui/core/IconButton'
import Button                         from '@material-ui/core/Button'
import CloseIcon                      from '@material-ui/icons/Close'
import Table                          from 'react-bootstrap/Table'
import Pagination                     from '@material-ui/lab/Pagination'
import request                        from '../request'
import { connect }     from 'react-redux'
import {
    createDoor,
    updateDoor,
    createDoorOtherColor, deleteItem, createDoorMore,
}                      from '../store/actions/doorsAction'
import { Init }        from '../store/actions/auhtAction'
import { getHomePage } from '../store/actions/layoutAction'

const useStyles = makeStyles({
    root:              {
        maxWidth: 345,
    },
    mediaFront:        {
        height: 240,
        width:  '49%',
        float:  'left',
    },
    mediaBack:         {
        height: 240,
        width:  '49%',
        float:  'right',
    },
    mediaBackInterior: {
        height: 240,
        width:  '49%',
        float:  'none',
        margin: '0 auto',
    },
    center: {
        display:        'flex',
        justifyContent: 'center',
        margin:         '20px 0',
    },
})
const useStyle  = makeStyles(() => ({
    appBar:           {
        position: 'relative',
    },
    save:             {
        float: 'right',
    },
    adminDoor:        {
        height:      '200px',
        marginLeft:  '20px',
        marginRight: '50px',
    },
    adminBackDoor:    {
        height:      '100px',
        marginLeft:  '20px',
        marginRight: '50px',
    },
    flex:             {
        display: 'flex',
    },
    flexDirection:    {
        display:       'flex',
        flexDirection: 'column',
    },
    flexBetween:      {
        display:        'flex',
        justifyContent: 'space-between',
    },
    flexDirectionEnd: {
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'flex-End',
    },
}))

const Doors = (props) => {
    const doorsOnPage                           = 12
    const { selectedDoors }                     = props
    const [ open, setOpen ]                     = useState(false)
    const [ openInterior, setOpenInterior ]     = useState(false)
    const [ smallImage, setSmallImage ]         = useState({})
    const [ moreImage, setMoreImage ]           = useState({})
    const [ selectedDoor, setSelectedDoor ]     = useState(null)
    const [ currentPage, setPage ]              = useState(1)
    const [ pageTotalCount, setPageTotalCount ] = useState(1)
    const [ doorsToShow, setDoorsToShow ]       = useState([])
    const classes = useStyles()
    const classe  = useStyle()

    useEffect(() => {
        if (! selectedDoors.length) {
            return
        }

        setPageTotalCount(Math.ceil(selectedDoors.length / doorsOnPage))
    }, [ selectedDoors ])

    useEffect(() => {
        const page = (currentPage - 1) * doorsOnPage
        setDoorsToShow(selectedDoors.slice(page, page + doorsOnPage))
    }, [ currentPage, selectedDoors ])

    const onPageChange = (event, page) => {
        if (page !== currentPage) {
            setPage(page)
        }
    }

    const handleClickOpen         = (door) => {
        setSelectedDoor(door)
        setOpen(true)
    }
    const handleClickOpenInterior = (door) => {
        setSelectedDoor(door)
        setOpenInterior(true)
    }

    const onChangeFrontImage = async event => {
        const data = new FormData()
        data.append('img', event.target.files[0])
        try {
            const response = await request.patch(`/doors/${ selectedDoor._id }/image`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            setSelectedDoor((selectedDoor) => ({
                ...selectedDoor,
                frontImage: response.data,
            }))
        } catch {
        }
    }

    const onChange = event => {
        event.persist()
        const name = event.target.name
        let addingValue
        if ([ 'image', 'frontImage' ].includes(name)) {
            addingValue = event.target.files[0]
        } else {
            addingValue = event.target.value
        }

        // wait for state last updated version, because state next version depends on prev version
        setSelectedDoor(selectedDoor => ({
            ...selectedDoor,
            [name]: addingValue,
        }))
    }

    const onLittleChange = (value, arrayName, name, index) => {
        setSelectedDoor((selectedDoor) => {
            const newArray = [ ...selectedDoor[arrayName] ]
            const field    = newArray[index]
            field[name]    = value

            return {
                ...selectedDoor,
                [arrayName]: newArray,
            }
        })
    }

    const handleAddSmallImage = event => {
        const name = event.target.name
        let addingValue
        if ('image' === name) {
            addingValue = event.target.files[0]
        } else {
            addingValue = event.target.value
        }

        setSmallImage({
            ...smallImage,
            [name]: addingValue,
        })
    }
    const handleAddMoreImage  = event => {
        const name = event.target.name
        let addingValue
        if ('image' === name) {
            addingValue = event.target.files[0]
        } else {
            addingValue = event.target.value
        }

        setMoreImage({
            ...moreImage,
            [name]: addingValue,
        })
    }

    const handleSmallImageSave = async () => {
        await props.createDoorOtherColor(selectedDoor._id, smallImage)
        window.location.reload()

    }
    const handleMoreImageSave  = async () => {
        await props.createDoorMore(selectedDoor._id, moreImage)
        window.location.reload()
    }

    const onDeleteItem       = async (id) => {
        await props.deleteItem(id)
        setOpen(false)
        setOpenInterior(false)
    }
    const handleSaveAndClose = async () => {
        let resp = await props.updateDoor(selectedDoor._id, selectedDoor)
        if (resp.success) {
            setOpen(false)
            setOpenInterior(false)
            window.location.reload()
        }
    }

    const deleteOtherColor = async (id) => {
        const response = await request.delete(`/doors/${ selectedDoor._id }/other-color/${ id }`)
        if (response.data.success) {
            setSelectedDoor((selectedDoor) => ({
                ...selectedDoor,
                otherColor: selectedDoor.otherColor.filter(({ _id }) => _id !== id),
            }))
        }
    }
    const deleteMoreImages = async (id) => {
        const response = await request.delete(`/doors/${ selectedDoor._id }/more-image/${ id }`)
        if (response.data.success) {
            setSelectedDoor((selectedDoor) => ({
                ...selectedDoor,
                moreImage: selectedDoor.moreImage.filter(({ _id }) => _id !== id),
            }))
        }
    }

    return (
        <>
            { ! doorsToShow.length ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <Grid container spacing={ 5 }>
                        { doorsToShow.reverse().map((res, index) => {
                            return (
                                'interior' === res.category ?
                                    (
                                        <Grid item xs={ 6 } md={ 3 } lg={ 3 } key={ index }>
                                            <Card className={ classes.root }
                                                  onClick={ () => handleClickOpenInterior(res) }>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={ classes.mediaFront }
                                                        image={ res.frontImage }
                                                    />
                                                    <CardMedia
                                                        className={ classes.mediaBackInterior }
                                                        image={ res.otherColor === 'undefined' ? res.otherColor[0].image : null }
                                                    />
                                                    <div>
                                                        <CardContent>
                                                            <Typography variant="h5" component="h3">
                                                                { res.title }
                                                            </Typography>
                                                        </CardContent>
                                                    </div>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Typography component="p">{ res.priceFront } руб</Typography>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={ 6 } md={ 3 } lg={ 3 } key={ index }>
                                            <Card className={ classes.root } onClick={ () => handleClickOpen(res) }>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={ classes.mediaFront }
                                                        image={ res.frontImage }
                                                    />
                                                    <CardMedia
                                                        className={ classes.mediaBack }
                                                        image={ res.otherColor === 'undefined' ? res.otherColor[0].image : 'not found' }
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h5" component="h3">
                                                            { res.title }
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Typography component="p">{ res.price } руб</Typography>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                            )
                        })
                        }
                    </Grid>
                    <div className={ classes.center }>
                        <Pagination count={ pageTotalCount } page={ currentPage } onChange={ onPageChange }
                                    size="large"/>
                    </div>
                </>
            ) }
            <Dialog fullScreen open={ open } onClose={ () => {
                setSmallImage({})
                setOpen(false)
            } }>
                <AppBar className={ classe.appBar }>
                    <Toolbar className={ classe.flexBetween }>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={ () => {
                                setSmallImage({})
                                setOpen(false)
                            } }
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Button autoFocus color="inherit" onClick={ handleSaveAndClose }>
                            САХРАНИТЬ
                        </Button>
                        <Button autoFocus color="secondary" onClick={ () => onDeleteItem(selectedDoor._id) }>
                            Удалить
                        </Button>
                    </Toolbar>
                </AppBar>
                { selectedDoor && (
                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Дверь с наружи</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img
                                        alt="Remy Sharp"
                                        src={ selectedDoor.frontImage }
                                        className={ classe.adminDoor }
                                    />
                                    <input type="file" name="frontImage" onChange={ onChangeFrontImage }/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Панель для входных дверей</th>
                                <th>Цена</th>
                                <th>Цвет</th>
                                <th>Сторона</th>
                                <th>Зарисовка</th>
                                <th>Опции</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="file" name="image" onChange={ handleAddSmallImage }/>
                                </td>
                                <td>
                                    <input type="text" value={ smallImage.price } name="price"
                                           onChange={ handleAddSmallImage }/>
                                </td>
                                <td>
                                    <input type="text" value={ smallImage.color } name="color"
                                           onChange={ handleAddSmallImage }/>
                                </td>
                                <td>
                                    <input type="text" value={ smallImage.side } name="side"
                                           onChange={ handleAddSmallImage }/>
                                </td>
                                <td>
                                    <input type="text" value={ smallImage.picture } name="picture"
                                           onChange={ handleAddSmallImage }/>
                                </td>
                                <td>
                                    <Button variant="contained" color="secondary" onClick={ handleSmallImageSave }>
                                        Добавить
                                    </Button>
                                </td>
                            </tr>
                            { selectedDoor.otherColor && selectedDoor.otherColor.map((res, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>
                                            <img
                                                alt="Remy Sharp"
                                                src={ res.image }
                                                className={ classe.adminBackDoor }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="littlePrice"
                                                onChange={ (event) => {
                                                    onLittleChange(event.target.value, 'otherColor', 'price', index)
                                                } }
                                                defaultValue={ res.price }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="littleColor"
                                                onChange={ (event) => {
                                                    onLittleChange(event.target.value, 'otherColor', 'color', index)
                                                } }
                                                defaultValue={ res.color }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="littleSide"
                                                onChange={ (event) => {
                                                    onLittleChange(event.target.value, 'otherColor', 'side', index)
                                                } }
                                                defaultValue={ res.side }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="LittlePicture"
                                                onChange={ (event) => {
                                                    onLittleChange(event.target.value, 'otherColor', 'picture', index)
                                                } }
                                                defaultValue={ res.picture }
                                            />
                                        </td>
                                        <td>
                                            <Button variant="contained" color="secondary"
                                                    onClick={ () => deleteOtherColor(res._id) }>
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Производитель</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.manufacturer }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'manufacturer' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Имя</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td> Панель для входных дверей
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.title }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'title' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Размер дверного блока</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.doorBlockSize }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'doorBlockSize' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Серия</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.series }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'series' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Толщина полотна (мм)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.metalSheetThickness }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'metalSheetThickness' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Толщина листа металла (мм.)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.thickness }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'thickness' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Класс прочности</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.strengthClass }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'strengthClass' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Значение по эксплутационным характеристикам</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.performanceValue }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'performanceValue' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Класс устойчивости к взлому</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.burglarResistanceClass }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'burglarResistanceClass' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Количество петель</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.numberOfLoops }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'numberOfLoops' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Противосъемы</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.antiSeize }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'antiSeize' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Регулировка прижима</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.clipAdjustment }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'clipAdjustment' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Коробка</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.box }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'box' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Вылет наличника от короба</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.platbandDepartureFromTheBox }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={'platbandDepartureFromTheBox'}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Крепление</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.mount }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'mount' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Утеплитель</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.insulation }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'insulation' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Усиление замковой зоны</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.castleStrengthening }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'castleStrengthening' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Ночная задвижка</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.nightValve }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'nightValve' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Терморазрыв</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.thermalBreak }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'thermalBreak' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Цинкогрунт</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.zinkogrunt }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'zinkogrunt' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Вес двери</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.doorWeight }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'doorWeight' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Цена</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.price }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'price' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Дополнительные фото</th>
                                <th>Опции</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="file" name="image" onChange={ handleAddMoreImage }/>
                                </td>
                                <td>
                                    <Button variant="contained" color="primary" onClick={ handleMoreImageSave }>
                                        Добавить
                                    </Button>
                                </td>
                            </tr>
                            { selectedDoor.moreImage && selectedDoor.moreImage.map((item, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>
                                            <img alt="Remy Sharp" src={ item.image } className={ classe.adminDoor }/>
                                        </td>
                                        <td>
                                            <Button variant="contained" color="secondary"
                                                    onClick={ () => deleteMoreImages(item._id) }>
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </Table>
                    </>
                ) }
            </Dialog>
            <Dialog fullScreen open={ openInterior } onClose={ () => {
                setSmallImage({})
                setOpenInterior(false)
            } }>
                <AppBar className={ classe.appBar }>
                    <Toolbar className={ classe.flexBetween }>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={ () => {
                                setSmallImage({})
                                setOpenInterior(false)
                            } }
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Button autoFocus color="inherit" onClick={ handleSaveAndClose }>
                            САХРАНИТЬ
                        </Button>
                        <Button autoFocus color="secondary" onClick={ () => onDeleteItem(selectedDoor._id) }>
                            Удалить
                        </Button>
                    </Toolbar>
                </AppBar>
                { selectedDoor && (
                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Дверь с наружи</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img
                                        alt="Remy Sharp"
                                        src={ selectedDoor.frontImage }
                                        className={ classe.adminDoor }
                                    />
                                    <input type="file" name="frontImage" onChange={ onChangeFrontImage }/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Панель для межкомнотных дверей</th>
                                <th>Цвет</th>
                                <th>Опции</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="file" name="image" onChange={ handleAddSmallImage }/>
                                </td>
                                <td>
                                    <input type="text" name="color" onChange={ handleAddSmallImage }/>
                                </td>

                                <td>
                                    <Button variant="contained" color="secondary" onClick={ handleSmallImageSave }>
                                        Добавить
                                    </Button>
                                </td>
                            </tr>
                            { selectedDoor.otherColor && selectedDoor.otherColor.map((res, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>
                                            <img
                                                alt="Remy Sharp"
                                                src={ res.image }
                                                className={ classe.adminBackDoor }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="littleColor"
                                                onChange={ (event) => {
                                                    onLittleChange(event.target.value, 'otherColor', 'color', index)
                                                } }
                                                defaultValue={ res.color }
                                            />
                                        </td>
                                        <td>
                                            <Button variant="contained" color="secondary"
                                                    onClick={ () => deleteOtherColor(res._id) }>
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Производитель</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.manufacturer }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'manufacturer' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Имя</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.title }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'title' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Размер дверного блока</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.doorBlockSize }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'doorBlockSize' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Серия</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.series }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'series' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Внутреннее наполнение</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.inside }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'inside' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Покрытие</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.coating }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'coating' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Тип остекления</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.glazing }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'glazing' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Цена за полотно</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.priceFront }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'priceFront' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Цена за комплект</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={ selectedDoor.fullPrice }
                                        style={ { width: '90%' } }
                                        onChange={ onChange }
                                        name={ 'fullPrice' }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-light bg-dark">
                                <th>Дополнительные фото</th>
                                <th>Опции</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="file" name="image" onChange={ handleAddMoreImage }/>
                                </td>
                                <td>
                                    <Button variant="contained" color="primary" onClick={ handleMoreImageSave }>
                                        Добавить
                                    </Button>
                                </td>
                            </tr>
                            { selectedDoor.moreImage && selectedDoor.moreImage.map((item, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>
                                            <img alt="Remy Sharp" src={ item.image } className={ classe.adminDoor }/>
                                        </td>
                                        <td>
                                            <Button variant="contained" color="secondary"
                                                    onClick={ () => deleteMoreImages(item._id) }>
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </Table>
                    </>
                ) }
            </Dialog>
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, {
    Init,
    createDoor,
    deleteItem,
    updateDoor,
    createDoorOtherColor,
    createDoorMore,
    getHomePage,
})(Doors)
