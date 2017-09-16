import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import reducer from './hanabi/reducers/history_reducer'

import BoardHistory from './hanabi/components/board_history'
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
      <BoardHistory />
    </Provider>,
    document.getElementById('hanabi-app'),
  )
}

init()
