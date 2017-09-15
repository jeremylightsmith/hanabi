import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import reducer from './hanabi/reducer'

import Board from './hanabi/components/board'
import { startGame } from './hanabi/actions'

let store = null

function init() {
  const middleware = process.env.NODE_ENV === 'production'
    ? []
    : [createLogger()]

  store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f),
  )

  store.dispatch(startGame())

  render(
    <Provider store={store}>
      <Board />
    </Provider>,
    document.getElementById('hanabi-app'),
  )
}

init()
