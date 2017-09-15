// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toPairs } from 'ramda'
import { discardCard, playCard, startGame } from '../actions'
import type { CardT, ColorT, PlayerT } from '../types'

import './board.scss'
import { COLORS } from '../model'

class Card extends PureComponent {
  props: {
    card: CardT,
    onClick?: () => void,
    selected?: boolean,
  }

  render() {
    const { card, onClick, selected } = this.props

    return (
      <div className={`card color-${card[0]} ${selected ? 'selected' : ''}`} onClick={onClick}>
        {card[1]}{' '}
      </div>
    )
  }
}

class EmptyCard extends PureComponent {
  render() {
    return <div className="card empty-card"/>
  }
}

class Player extends PureComponent {
  props: {
    player: PlayerT,
    dispatch: any,
    index: number,
  }

  state = {
    selected: null,
  }

  state: {
    selected: ?number,
  }

  renderCard = (card: CardT, i: number) => {
    const { dispatch } = this.props
    const { selected } = this.state

    return (
      <Card card={card}
            dispatch={dispatch}
            selected={selected === i}
            onClick={() => {
              this.setState({ selected: (this.state.selected === i ? null : i) })
            }}
            key={i} />
    )
  }

  render() {
    const { player, index, dispatch } = this.props
    const { selected } = this.state

    return (
      <div className="player">
        <h4>Player {index}</h4>
        <div className="hand">
          {player.hand.map(this.renderCard)}
        </div>
        {selected !== null && (
          <div className="actions">
            <button onClick={() => {
              dispatch(playCard(index, selected))
              this.setState({ selected: null })
            }}>Play
            </button>
            <button onClick={() => {
              dispatch(discardCard(index, selected))
              this.setState({ selected: null })
            }}>Discard
            </button>
          </div>
        )}
      </div>
    )
  }
}

class Table extends PureComponent {
  props: {
    table: { [ColorT]: number }
  }

  render() {
    const { table } = this.props

    return (
      <div className="table">
        <h4>Table</h4>

        {COLORS.map(color => (
          table[color] !== undefined ? (
            <Card card={`${color}${table[color]}`} key={color} />
          ) : (
            <EmptyCard key={color} />
          )
        ))}

      </div>
    )
  }
}

class Board extends PureComponent {
  props: {
    players: PlayerT[],
    table: { [ColorT]: number },
    dispatch: any,
  }

  render() {
    const { dispatch, table, players } = this.props
    return (
      <div className="board">
        <Table table={table} />

        <div className="players">
          {players && players.map((player, i) =>
            <Player player={player} dispatch={dispatch} key={i} index={i} />
          )}
        </div>

        <button onClick={() => dispatch(startGame())}>Restart Game</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { deck, players, discards, table, lastMove, livesLeft, hintsLeft } = state
  return { deck, players, discards, table, lastMove, livesLeft, hintsLeft }
}

export default connect(mapStateToProps, null)(Board)
