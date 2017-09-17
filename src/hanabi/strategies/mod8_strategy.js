// @flow
import { indexOf, intersection } from 'ramda'
import { playCard, discardCard, giveHint } from '../actions'
import type { BoardT } from '../types'
import { COLORS } from '../model'

const nextCardsToPlay = (board: BoardT) => COLORS.map(c => `${c}${(board.table[c] || 0) + 1}`)

// return the next action
export const play = (me: number, board: BoardT) => {
  const myHand = board.players[me].hand
  const goodCards = intersection(myHand, nextCardsToPlay(board))
  if (goodCards.length === 0) {
    return discardCard(me, 0)
  } else {
    return playCard(me, indexOf(goodCards[0], myHand))
  }
}

// look at the previous board and the current board, and return any notes you want to keep
export const playHappened = (me: number, notes: mixed, prevBoard: BoardT, board: BoardT) => {
  return notes
}
