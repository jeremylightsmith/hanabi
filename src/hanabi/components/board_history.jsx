// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { BoardT } from '../types'

import Board from './board'

import './board_history.scss'

const HistoryLink = ({ board, index }: { board: BoardT, index: number }) => {
  const toString = (move) => {
    if (!move) return 'initial board'
    switch (move.type) {
      case 'play':
        return `P${move.player}: play`
      case 'discard':
        return `P${move.player}: discard`
      case 'hint':
        return `P${move.player}: hint`
    }
  }

  return (
    <div className="history-link">
      {toString(board.lastMove)}
    </div>
  )
}

class BoardHistory extends PureComponent {
  props: {
    currentBoard: BoardT,
    boards: BoardT[],
    dispatch: any,
  }

  render() {
    const { dispatch, currentBoard, boards } = this.props

    return (
      <div className="board-history">
        <div className="board-container">
          <Board board={currentBoard} dispatch={dispatch} />
        </div>

        <div className="history-container">
          <div className="history">
            {boards.map((board, i) =>
              <HistoryLink key={i} board={board} index={i} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, null)(BoardHistory)
