// @flow
import React, { PureComponent } from 'react'
import { identity, times } from 'ramda'
import { advance, discardCard, playCard, startGame } from '../actions'
import type { BoardT, CardT, ColorT, PlayerT } from '../types'

import './board.scss'
import { COLORS, getCurrentPlayer } from '../model'

const Card = ({ card, onClick, selected }: {
  card: CardT,
  onClick?: () => void,
  selected?: boolean,
}) => (
  <div className={`card color-${card[0]} ${selected ? 'selected' : ''}`} onClick={onClick}>
    {card[1]}{' '}
  </div>
)

const EmptyCard = () => {
  return <div className="card empty-card" />
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

const Table = ({ table }: {
  table: { [ColorT]: number }
}) => (
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

const Discards = ({ discards }: {
  discards: CardT[],
}) => (
  <div className="table">
    <h4>Discards</h4>

    {discards.map(card => <Card card={card} />)}
  </div>
)

const Lives = ({ lives }: {
  lives: number,
}) => (
  <div className="lives">
    <h4>Lives</h4>

    {times(identity, lives).map((i) => <div className="life circle" key={i} />)}
  </div>
)

const Hints = ({ hints }: {
  hints: number,
}) => (
  <div className="hints">
    <h4>Hints</h4>

    {times(identity, hints).map((i) => <div className="hint circle" key={i} />)}
  </div>
)

const Deck = ({ cards }: {
  cards: CardT[],
}) => (
  <div className="deck">
    <h4>Deck</h4>

    {cards.length} cards left
  </div>
)

export default class Board extends PureComponent {
  props: {
    board: BoardT,
    dispatch: any,
  }

  render() {
    const { dispatch, board } = this.props
    const { table, discards, deck, players, livesLeft, hintsLeft } = board
    const currentPlayer = getCurrentPlayer(board)

    return (
      <div className="board">
        <Table table={table} />
        <Discards discards={discards} />
        <Lives lives={livesLeft} />
        <Hints hints={hintsLeft} />
        <Deck cards={deck}/>

        <div className="players">
          {players && players.map((player, i) =>
            <Player player={player} dispatch={dispatch} key={i} index={i} current={currentPlayer === i} />
          )}
        </div>

        <button className="advance" onClick={() => dispatch(advance())}>Advance</button>
        <button className="start-game" onClick={() => dispatch(startGame())}>Restart Game</button>
      </div>
    )
  }
}
