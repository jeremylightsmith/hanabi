// @flow
import * as c from './constants'

export const startGame = () => ({ type: c.START_GAME })
export const playCard = (player: number, card: number) => ({ type: c.PLAY_CARD, player, card })
export const discardCard = (player: number, card: number) => ({ type: c.DISCARD_CARD, player, card })
