/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Memo.js',()=>{

  it('Lancer le jeu', () => {
    cy.visit('../../../Memo.html')
    cy.get('#size').type('3')
    cy.get('#timer').type('10')
    cy.get('#timer2').type('60')
    cy.get('#Start').click()

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
  });

it('Temps de Mémorisation', () => {
  cy.visit('../../../Memo.html')
  cy.get('#size').type('3')
  cy.get('#timer').type('1')
  cy.get('#timer2').type('60')
  cy.get('#Start').click()
  cy.wait(1000)
  cy.get('#item1').should("have.attr","src","11.png")
})

it('Temps imparti', () => {
  cy.visit('../../../Memo.html')
  cy.get('#size').type('3')
  cy.get('#timer').type('1')
  cy.get('#timer2').type('60')
  cy.get('#Start').click()
  cy.wait(1000)
  cy.get('#timer2').should("have.html","")
  cy.on('window:alert', (alert) => {
    expect(alert).to.contains('Le temps est écoulé!');
});
})

it('Nombre correct de cartes affichées', () => {
  cy.visit('../../../Memo.html')
  cy.get('#size').type('3')
  cy.get('#timer').type('1')
  cy.get('#timer2').type('60')
  cy.get('#Start').click()
  cy.get('ul li').should('have.length',8)
})

it('Action sur une carte', () => { //Test fonctionnel mais, mais non éxécuté correctement entier en raison d'un itération qui ne se fait pas jusq'au bout
  cy.visit('../../../Memo.html')
  cy.get('#size').type('3')
  cy.get('#timer').type('1')
  cy.get('#timer2').type('60')
  cy.get('#Start').click()
  cy.wait(10000)
  cy.get('#list > :nth-child(1)').click()
  cy.get("#item0").should("not.have.attr","src","11.png")
})
})