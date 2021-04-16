/// <reference types="cypress" />

describe('Properties List Page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('header should be visible', () => {
    cy.contains(/property links/i).should('be.visible');
  })

  it('the length of the property cards should be 20', () => {
    cy.get('.container').should('have.length', 20);
  })

  it('listing price should be visible', () => {
    cy.get('.listing-price').should('be.visible');
  })

  it('address should be visible', () => {
    cy.get('.address').should('be.visible');
  })

  it('property info should be visible', () => {
    cy.get('.property-info').should('be.visible');
  })

  it('listed property info should be visible', () => {
    cy.get('.listing-date').should('be.visible');
  })

  it('favorite heart should change color after clicking', () => {
    cy.get('.icon-heart')
      .first()
      .should('be.visible')
      .click();
    // favorite(red color) heart should be visible
    cy.get('[data-testid="favorite"]').should('be.visible');
    // length of empty hearts should be 19
    cy.get('[data-testid="not-favorite"]').should('have.length', 19);
  })
})
