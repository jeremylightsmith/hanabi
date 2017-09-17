// @flow
import { append, last } from 'ramda'
import * as c from '../constants'
import boardReducer, { INITIAL_STATE as INITIAL_BOARD_STATE } from './board_reducer'
import { getCurrentPlayer } from '../model'
import * as strategy from '../strategies/mod8_strategy'

const INITIAL_STATE = {
  currentBoard: INITIAL_BOARD_STATE,
  boards: [INITIAL_BOARD_STATE],
}


export default function historyReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case c.START_GAME: {
      const board = boardReducer({}, action)
      return {
        currentBoard: board,
        boards: [board]
      }
    }

    case c.PLAY_CARD:
    case c.DISCARD_CARD:
    case c.GIVE_HINT:
    case c.ADVANCE: {
      const board = boardReducer(last(state.boards), action)
      return {
        currentBoard: board,
        boards: append(board, state.boards)
      }
    }

    default:
      return state
  }
}
