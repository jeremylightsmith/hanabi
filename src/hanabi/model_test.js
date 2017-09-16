import { expect } from 'chai'
import { equals, filter } from 'ramda'
import { dealCard, dealCards, didWin, discardCard, isGameOver, playCard, shuffle } from './model'

describe('hanabi.model', () => {
  describe('#dealCard', () => {
    it('should deal the next card to player X', () => {
      let state = {
        deck: ['R1', 'R2', 'R3'],
        players: [
          { hand: [] },
          { hand: [] },
          { hand: [] },
          { hand: [] },
        ]
      }
      state = dealCard(0, state)

      expect(state.deck).to.eql(['R2', 'R3'])
      expect(state.players[0]).to.eql({ hand: ['R1'] })

      state = dealCard(1, state)
      expect(state.deck).to.eql(['R3'])
      expect(state.players[1]).to.eql({ hand: ['R2'] })

      state = dealCard(0, state)
      expect(state.deck).to.eql([])
      expect(state.players[0]).to.eql({ hand: ['R1', 'R3'] })

      state = dealCard(0, state)
      expect(state.deck).to.eql([])
      expect(state.players[0]).to.eql({ hand: ['R1', 'R3'] })
    })
  })

  describe('#dealCards', () => {
    it('should deal 4 cards to each player', () => {
      let state = {
        deck: [
          'R1', 'R2', 'R3', 'R4',
          'G1', 'G2', 'G3', 'G4',
          'B1', 'B2', 'B3', 'B4',
          'Y1', 'Y2', 'Y3', 'Y4', 'Y5'
        ],
        players: [
          { hand: [] },
          { hand: [] },
          { hand: [] },
          { hand: [] },
        ]
      }
      state = dealCards(state)

      expect(state).to.eql({
        deck: ['Y5'],
        players: [
          { hand: ['R1', 'G1', 'B1', 'Y1'] },
          { hand: ['R2', 'G2', 'B2', 'Y2'] },
          { hand: ['R3', 'G3', 'B3', 'Y3'] },
          { hand: ['R4', 'G4', 'B4', 'Y4'] },
        ]
      })
    })
  })

  describe('#shuffle', () => {
    it('should have a bunch of cards', () => {
      const deck = shuffle({}).deck
      expect(deck.length).to.eql(50)
      expect(filter(equals('R1'), deck).length).to.eql(3)
      expect(filter(equals('G5'), deck).length).to.eql(1)
    })
  })

  describe('#playCard', () => {
    it('should play card if valid', () => {
      let state = {
        table: {
          R: null,
          G: null,
          Y: null,
        },
        players: [
          { hand: ['R1', 'G2', 'Y5'] },
          { hand: ['R2', 'G1', 'Y5'] },
        ]
      }

      state = playCard(0, 0, state)
      expect(state).to.eql({
          table: {
            R: 1,
            G: null,
            Y: null,
          },
          players: [
            { hand: ['G2', 'Y5'] },
            { hand: ['R2', 'G1', 'Y5'] },
          ],
          lastMove: { player: 0, type: 'play' },
        }
      )

      state = playCard(1, 1, state)
      state = playCard(1, 0, state)
      expect(state).to.eql({
          table: {
            R: 2,
            G: 1,
            Y: null,
          },
          players: [
            { hand: ['G2', 'Y5'] },
            { hand: ['Y5'] },
          ],
          lastMove: { player: 1, type: 'play' },
        }
      )
    })

    it('should take a life and discard if invalid', () => {
      let state = {
        table: {
          R: null,
          G: 1,
        },
        players: [
          { hand: ['R3', 'G3'] },
        ],
        livesLeft: 2,
      }

      state = playCard(0, 0, state)
      expect(state).to.eql({
          table: {
            R: null,
            G: 1,
          },
          players: [
            { hand: ['G3'] },
          ],
          discards: ['R3'],
          livesLeft: 1,
          lastMove: { player: 0, type: 'play' },
        }
      )
      expect(isGameOver(state)).to.eql(false)

      state = playCard(0, 0, state)
      expect(state).to.eql({
          table: {
            R: null,
            G: 1,
          },
          players: [
            { hand: [] },
          ],
          discards: ['G3', 'R3'],
          livesLeft: 0,
          lastMove: { player: 0, type: 'play' },
        }
      )
      expect(isGameOver(state)).to.eql(true)
      expect(didWin(state)).to.eql(false)
    })
  })

  describe('#didWin', () => {
    it('should know when the game is won', () => {
      let board = {
        table: { R: 5, G: 5, B: 5, W: 5, Y: 5 },
      }

      expect(isGameOver(board)).to.eql(true)
      expect(didWin(board)).to.eql(true)

      board.table.R = 4
      expect(isGameOver(board)).to.eql(false)
      expect(didWin(board)).to.eql(false)

      board.table.G = undefined
      expect(didWin(board)).to.eql(false)
    })
  })

  describe('#discardCard', () => {
    it('should discard card', () => {
      let state = {
        discards: [],
        players: [
          { hand: ['R1', 'G2', 'Y5'] },
        ]
      }

      state = discardCard(0, 0, state)
      expect(state).to.eql({
          discards: ['R1'],
          players: [
            { hand: ['G2', 'Y5'] },
          ],
          lastMove: { player: 0, type: 'discard' },
        }
      )

      state = discardCard(0, 1, state)
      expect(state).to.eql({
          discards: ['Y5', 'R1'],
          players: [
            { hand: ['G2'] },
          ],
          lastMove: { player: 0, type: 'discard' },
        }
      )
    })
  })
})
