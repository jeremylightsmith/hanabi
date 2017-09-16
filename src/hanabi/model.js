// @flow
import { all, append, assoc, assocPath, curry, dec, flatten, path, pipe, prepend, remove } from 'ramda'

import type { BoardT, CardT } from './types'
import { updateIn } from '../ramda_helpers'

export const COLORS = ['R', 'G', 'B', 'Y', 'W']

const newDeck = () => (
  flatten(COLORS.map(color => (
    [1, 1, 1, 2, 2, 3, 3, 4, 4, 5].map(number => (
      `${color}${number}`
    ))
  )))
)

export const shuffle = (board: BoardT) => {
  let deck = newDeck()
  const shuffledDeck = []

  while (deck.length > 0) {
    const i = Math.floor(Math.random() * deck.length)
    const card = deck[i]
    shuffledDeck.push(card)
    deck = remove(i, 1, deck)
  }

  return {
    ...board,
    deck: shuffledDeck,
  }
}

export const dealCard = curry((player: number, board: BoardT) => {
  const nextCard = board.deck[0]
  if (!nextCard) return board
  return pipe(
    updateIn(['deck'], remove(0, 1)),
    updateIn(['players', player, 'hand'], append(nextCard))
  )(board)
})

export const dealCards = (board: BoardT) => {
  let newState = board;
  [1, 2, 3, 4].forEach(() => {
    board.players.forEach((_, player: number) => {
      newState = dealCard(player, newState)
    })
  })
  return newState
}

export const colorOf = (card: CardT) => card[0]
export const numberOn = (card: CardT) => parseInt(card[1])

const getCard = (playerIndex: number, cardIndex: number, board: BoardT) =>
  path(['players', playerIndex, 'hand', cardIndex])(board)

const removeCard = curry((playerIndex: number, cardIndex: number, board: BoardT) =>
  updateIn(['players', playerIndex, 'hand'], remove(cardIndex, 1))(board)
)

export const playCard = curry((playerIndex: number, cardIndex: number, board: BoardT) => {
  const card = getCard(playerIndex, cardIndex, board)
  const newBoard = pipe(
    removeCard(playerIndex, cardIndex),
    assoc('lastMove', { player: playerIndex, type: 'play' }),
  )(board)

  const currentCardOnTable = path(['table', colorOf(card)], board) || 0
  if (numberOn(card) === currentCardOnTable + 1) {
    return pipe(
      assocPath(['table', colorOf(card)], numberOn(card)),
    )(newBoard)
  } else {
    return pipe(
      updateIn(['discards'], prepend(card)),
      updateIn(['livesLeft'], dec),
    )(newBoard)
  }
})

export const discardCard = curry((playerIndex: number, cardIndex: number, board: BoardT) => {
  const card = getCard(playerIndex, cardIndex, board)
  return pipe(
    updateIn(['discards'], prepend(card)),
    removeCard(playerIndex, cardIndex),
    assoc('lastMove', { player: playerIndex, type: 'discard' }),
  )(board)
})

export const getCurrentPlayer = (board: BoardT) => {
  const lastPlayer = path(['lastMove', 'player'], board)
  return lastPlayer === undefined ? 0 : (lastPlayer + 1) % board.players.length
}

export const didWin = (board: BoardT) => all(c => board.table[c] === 5, COLORS)
export const isGameOver = (board: BoardT) => didWin(board) || board.livesLeft === 0

