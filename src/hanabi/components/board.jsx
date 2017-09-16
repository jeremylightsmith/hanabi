// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toPairs } from 'ramda'
import { discardCard, playCard, startGame } from '../actions'
import type { CardT, ColorT, PlayerT } from '../types'

import './board.scss'
import { COLORS, getCurrentPlayer } from '../model'

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
    return <div className="card empty-card" />
  }
}

class Player extends PureComponent {
  props: {
    player: PlayerT,
    dispatch: any,
    index: number,
    current: boolean,
  }

  state = {
    selected: null,
  }

  state: {
    selected: ?number,
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevProps.current && !this.props.current && this.state.selected !== null) {
      this.setState({ selected: null })
    }
  }

  renderCard = (card: CardT, i: number) => {
    const { dispatch, current } = this.props
    const { selected } = this.state

    const onClick = current ? (() => {
      this.setState({ selected: (this.state.selected === i ? null : i) })
    }) : undefined

    return (
      <Card card={card}
            dispatch={dispatch}
            selected={selected === i}
            onClick={onClick}
            key={i} />
    )
  }

  render() {
    const { player, index, dispatch, current } = this.props
    const { selected } = this.state

    return (
      <div className="player">
        <h4>Player {index} {current ? '(on deck)' : ''}</h4>
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

class Discards extends PureComponent {
  props: {
    discards: CardT[],
  }

  render() {
    const { discards } = this.props

    return (
      <div className="table">
        <h4>Discards</h4>

        {discards.map(card => <Card card={card} />)}
      </div>
    )
  }
}

class Board extends PureComponent {
  props: {
    players: PlayerT[],
    table: { [ColorT]: number },
    discards: CardT[],
    dispatch: any,
    currentPlayer: number,
  }

  render() {
    const { dispatch, table, discards, players, currentPlayer } = this.props
    return (
      <div className="board">
        <Table table={table} />
        <Discards discards={discards} />

        <div className="players">
          {players && players.map((player, i) =>
            <Player player={player} dispatch={dispatch} key={i} index={i} current={currentPlayer === i} />
          )}
        </div>

        <button onClick={() => dispatch(startGame())}>Restart Game</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { deck, players, discards, table, lastMove, livesLeft, hintsLeft } = state
  return {
    deck, players, discards, table, lastMove, livesLeft, hintsLeft,
    currentPlayer: getCurrentPlayer(state)
  }
}

export default connect(mapStateToProps, null)(Board)
