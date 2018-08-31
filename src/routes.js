import React from 'react'
import { Route } from 'react-router-dom'
import Home from './containers/home'
import Login from './containers/login'
import Publish from './containers/publish'
import User from './containers/user'
import Message from './containers/message'
import Topic from './containers/topic'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/topic/:id',
    component: Topic
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/publish',
    component: Publish
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/user/:loginname?',
    component: User
  }
]

const renderRoutes = function () {
  return routes.map((route, index) => (<Route
    key={index}
    path={route.path}
    exact={route.exact}
    component={route.component}
  />))
}

export default renderRoutes()