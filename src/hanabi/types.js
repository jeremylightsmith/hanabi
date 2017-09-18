// @flow

export type ColorT = 'R' | 'G' | 'B' | 'Y' | 'W' // red, green, blue, yellow, white
export type CardT = string // like G2, R1, Y5

export type PlayerT = {
  hand: CardT[],
  notes: mixed,
}

export type HintT = {
  player: number,
  cards: number[],
  color?: ColorT,
  number?: number,
}

export type MoveT = | {
  type: 'hint',
  player: number,
  hint: HintT
} | {
  type: 'play' | 'discard',
  player: number,
  card: number,
}

export type BoardT = {
  turn: number,
  deck: CardT[],
  players: PlayerT[],
  discards: CardT[],
  table: { [ColorT]: ?number },
  lastMove: ?MoveT,
  livesLeft: number,
  hintsLeft: number,
  lastTurn?: number,  // set when the cards run out
}

export type AllBoardsT = {
  currentBoard: BoardT,
  boards: BoardT[],
}
