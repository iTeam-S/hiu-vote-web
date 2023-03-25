import { sum } from './sum'

describe('sum', () => {
  it('devrait retourner la somme de deux nombres', () => {
    const resultat = sum(3, 5)
    expect(resultat).toEqual(8)
  })

  it('devrait retourner la somme de deux nombres négatifs', () => {
    const resultat = sum(-4, -2)
    expect(resultat).toEqual(-6)
  })

  it('devrait retourner la somme de deux nombres décimaux', () => {
    const resultat = sum(2.5, 1.75)
    expect(resultat).toEqual(4.25)
  })
})
