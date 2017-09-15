// @flow
import { pipe } from 'ramda'
import * as c from './constants'
import { dealCards, shuffle } from './model'

const INITIAL_STATE = {
  deck: [],
  players: [],
  discards: [],
  table: {},
  lastMove: {},
  livesLeft: 4,
  hintsLeft: 8,
}

export default function reducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case c.START_GAME:
      return pipe(
        shuffle,
        dealCards,
      )({
        ...INITIAL_STATE,
        players: [
          { hand: [] },
          { hand: [] },
          { hand: [] },
          { hand: [] },
        ]
      })

    default:
      return state
  }
}
