import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { startGame } from '../actions'

class Board extends PureComponent {

  render() {
    const { dispatch } = this.props
    return (
      <div className="Board">
        <button onClick={() => dispatch(startGame())}>Start Game</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { deck, players, discards, table, lastMove, livesLeft, hintsLeft } = state
  return { deck, players, discards, table, lastMove, livesLeft, hintsLeft }
}
export default connect(mapStateToProps, null)(Board)
