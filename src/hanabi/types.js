// @flow

export type ColorT = 'R' | 'G' | 'B' | 'Y' | 'W' // red, green, blue, yellow, white
export type CardT = string // like G2, R1, Y5

export type PlayerT = {
  hand: CardT[],
}

export type MoveT = | {
  player: number,
  type: 'hint',
  hint: {
    player: number,
    cardIndices: number[],
    color?: ColorT,
    number?: number,
  }
} | {
  player: number,
  type: 'play' | 'discard',
  card: CardT,
}

export type BoardT = {
  deck: CardT[],
  players: PlayerT[],
  discards: CardT[],
  table: { [ColorT]: ?number },
  lastMove: ?MoveT,
  livesLeft: number,
  hintsLeft: number,
}

export type AllBoardsT = {
  currentBoard: BoardT,
  boards: BoardT[],
}
