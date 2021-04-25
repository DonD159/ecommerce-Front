import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticate } from './index'


const PrivetRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticate() ? (
        <Component {...props}/>
    ) : (
        <Redirect to={{pathname: "/signin", state:{ from: props.location }}} />
    ) } />
);

export default PrivetRoute;

