// @flow
import { append, flatten, pipe, remove } from 'ramda'

import type { BoardT } from './types'
import { updateIn } from '../ramda_helpers'

const newDeck = () => (
  flatten(['R', 'G', 'B', 'Y', 'W'].map(color => (
    [1, 1, 1, 2, 2, 3, 3, 4, 4, 5].map(number => (
      `${color}${number}`
    ))
  )))
)

export const shuffle = (state: BoardT) => {
  let deck = newDeck()
  const shuffledDeck = []

  while (deck.length > 0) {
    const i = Math.random() * deck.length
    const card = deck[i]
    shuffledDeck.push(card)
    deck = remove(i, 1, deck)
  }

  return {
    ...state,
    deck: shuffledDeck,
  }
}

export const dealCard = (state: BoardT, player: number) => {
  const nextCard = state.deck[0]
  return pipe(
    updateIn(['deck'], remove(0, 1)),
    updateIn(['players', player, 'hand'], append(nextCard))
  )(state)
}

export const dealCards = (state: BoardT) => {
  let newState = state;
  [1, 2, 3, 4].forEach(() => {
    state.players.forEach((_, player: number) => {
      newState = dealCard(newState, player)
    })
  })
  return newState
}
