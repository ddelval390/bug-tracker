import React, {useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from '../global/Store'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [state] = useContext(Context)
    return (
  <Route {...rest} render={props => (
    state.isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)}

export default PrivateRoute
