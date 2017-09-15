// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { startGame } from '../actions'
import type { CardT, PlayerT } from '../types'

import './board.scss'

class Board extends PureComponent {
  props: {
    players: PlayerT[],
    dispatch: any,
  }

  renderCard = (card: CardT, index: number) => (
    <span key={index} className={`Card color-${card[0]}`}>
      {card}{' '}
    </span>
  )

  renderPlayerHand = (player: PlayerT, index: number) => (
    <div key={index} className="Hand">
      P{index}: {player.hand.map(this.renderCard)}
    </div>
  )

  render() {
    const { dispatch, players } = this.props
    return (
      <div className="Board">
        <button onClick={() => dispatch(startGame())}>Start Game</button>

        {players && players.map(this.renderPlayerHand)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { deck, players, discards, table, lastMove, livesLeft, hintsLeft } = state
  return { deck, players, discards, table, lastMove, livesLeft, hintsLeft }
}

export default connect(mapStateToProps, null)(Board)
