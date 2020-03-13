import React,  from 'react'
import {HashRouter, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Init} from '../store/actions/auhtAction'

function PrivateRoute({component, auth, Init, ...rest}) {

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
