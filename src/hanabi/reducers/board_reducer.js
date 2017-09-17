// @flow
import { pipe } from 'ramda'
import * as c from '../constants'
import {
  dealCard, dealCards, discardCard, getCurrentPlayer, giveHint, notifyPlayers, playCard,
  shuffle
} from '../model'
import * as strategy from '../strategies/mod8_strategy'

export const INITIAL_STATE = {
  deck: [],
  players: [],
  discards: [],
  table: {},
  lastMove: null,
  livesLeft: 4,
  hintsLeft: 8,
}

export default function boardReducer(state: any = INITIAL_STATE, action: any) {
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

    case c.PLAY_CARD:
      return pipe(
        playCard(action.player, action.card),
        dealCard(action.player),
        notifyPlayers(strategy.playHappened, state),
      )(state)

    case c.DISCARD_CARD:
      return pipe(
        discardCard(action.player, action.card),
        dealCard(action.player),
        notifyPlayers(strategy.playHappened, state),
      )(state)

    case c.GIVE_HINT:
      return pipe(
        giveHint(action.player, action.board),
        notifyPlayers(strategy.playHappened, state),
      )(state)

    case c.ADVANCE: {
      const player = getCurrentPlayer(state)
      const move = strategy.play(player, state)
      return boardReducer(state, move)
    }

    default:
      return state
  }
}
