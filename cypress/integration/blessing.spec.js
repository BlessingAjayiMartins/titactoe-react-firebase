/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('.rightclick() - right click on a DOM element', () => {
    cy.get('[data-cy=1]').click()
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    // cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    // cy.get('.rightclick-action-input-hidden').should('be.visible')
  })  
})
