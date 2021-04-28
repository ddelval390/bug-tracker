import React, {useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from '../global/Store'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const [store] = useContext(Context)
    return (
  <Route {...rest} render={props => (
    store.isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        store: { from: props.location }
      }}/>
    )
  )}/>
)}

export default PrivateRoute
