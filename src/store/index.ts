import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router'
import { format } from 'url'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import Router from 'next/router'

import thunkMiddleware from 'redux-thunk'
import reducers from './reducer'

import { createLogger } from 'redux-logger';

const logger = createLogger();

const bindMiddleware = (middleware:any) => {
  const { composeWithDevTools } = require('redux-devtools-extension')
  return composeWithDevTools(applyMiddleware(...middleware))
}

const reducer = (state:any, action:any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router 
    }
    return nextState
  } else {
    return reducers(state, action)
  }
}

export const initStore = (context:any) => {
  const routerMiddleware = createRouterMiddleware()
  const { asPath, pathname, query } = context.ctx || Router.router || {};
  let initialState
  if (asPath) {
    const url = format({ pathname, query })
    initialState = {
      router: initialRouterState(url, asPath)
    }
  }
  // return createStore(reducer, initialState, bindMiddleware([routerMiddleware, thunkMiddleware, logger]))
  return createStore(reducer, initialState, bindMiddleware([routerMiddleware, thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)