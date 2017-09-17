// @flow
import * as c from './constants'
import type { HintT } from './types'

export const startGame = () => ({ type: c.START_GAME })
export const advance = () => ({type: c.ADVANCE})

export const playCard = (player: number, card: number) => ({ type: c.PLAY_CARD, player, card })
export const discardCard = (player: number, card: number) => ({ type: c.DISCARD_CARD, player, card })
export const giveHint = (player: number, hint: HintT) => ({ type: c.GIVE_HINT, player, hint })
