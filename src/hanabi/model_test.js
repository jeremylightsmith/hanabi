import { expect } from 'chai'
import { equals, filter } from 'ramda'
import { dealCard, dealCards, shuffle } from './model'

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
      state = dealCard(state, 0)

      expect(state.deck).to.eql(['R2', 'R3'])
      expect(state.players[0]).to.eql({hand: ['R1']})

      state = dealCard(state, 1)

      expect(state.deck).to.eql(['R3'])
      expect(state.players[1]).to.eql({hand: ['R2']})

      state = dealCard(state, 0)

      expect(state.deck).to.eql([])
      expect(state.players[0]).to.eql({hand: ['R1', 'R3']})
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
})
