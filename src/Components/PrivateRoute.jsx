import React, {useEffect, useState} from 'react'
import {HashRouter, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Init} from '../store/actions/auhtAction'

function PrivateRoute({component, auth, Init, ...rest}) {
  let [isAuthenticated, setIsAuthenticated] = useState(false)
  // useEffect(() => {
  //   Init();
  // }, []);
  // useEffect(() => {
  //   setIsAuthenticated(auth.token);
  // }, [auth.token]);
  return (
    <Route
      {...rest}
      render={props =>
        auth.token ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/SignIn',
              // state: {
              //   from: props.location
              // }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {Init})(PrivateRoute)
