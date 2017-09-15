import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

import Board from './components/board'

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

  render(
    <Provider store={store}>
      <Board />
    </Provider>,
    document.getElementById('hanabi-app'),
  )
}

init()
