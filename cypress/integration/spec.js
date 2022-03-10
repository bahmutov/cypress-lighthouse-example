/// <reference types="@cypress-audit/lighthouse" />

it('loads fast enough', () => {
  cy.visit('/')
  cy.lighthouse()
})
