import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './Components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Advantage from './Pages/Advantage'
import Catalog from './Pages/Catalog'
import Contact from './Pages/Contact'
import Landing from './Components/Landing'
import Catalogs from './Pages/Catalogs'
import Administrator from './Components/Administrator'
import SignIn from './Components/SignIn'
import DoorDesc from './Pages/DoorDesc'

import { Provider } from 'react-redux'
import store from './store/configureStore'
import Orders from './Components/Orders'
import AdminSlider from './Components/AdminSlider'
import AboutAdmin from './Components/AboutAdmin'
import AdminBrends from './Components/AdminBrends'
import CreateDoor from './Components/CreateDoor'
import Logout from './Components/Logout'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/Administrator" component={Administrator}/>
        <Header/>
        <Route exact path="/SignIn" component={SignIn}/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/advantage" component={Advantage}/>
        <Route exact path="/catalog" component={Catalog}/>
        <Route exact path="/contact" component={Contact}/>
        <Route path="/catalogs" component={Catalogs}/>
        <Route path="/doorDesc" component={DoorDesc}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/adminSlider" component={AdminSlider}/>
        <Route path="/aboutAdmin" component={AboutAdmin}/>
        <Route path="/adminBrends" component={AdminBrends}/>
        <Route path="/createDoor" component={CreateDoor}/>
        <Route path="/logout" component={Logout}/>
      </Router>
    </Provider>
  )
}

export default App
