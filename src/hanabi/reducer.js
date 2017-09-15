import * as c from './constants'

const INITIAL_STATE = {
  deck: [],
  players: [],
  discards: [],
  table: {},
  lastMove: {},
  livesLeft: 4,
  hintsLeft: 8,
}

export default function reducer(state = INITIAL_STATE, action) {
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
