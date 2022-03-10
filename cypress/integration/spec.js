/// <reference types="@cypress-audit/lighthouse" />

it('loads fast enough', () => {
  cy.visit('/')
  cy.lighthouse(
    {
      performance: 60,
      accessibility: 90,
      'best-practices': 80,
      seo: 80,
    },
    {
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        disable: false,
        width: Cypress.config('viewportWidth'),
        height: Cypress.config('viewportHeight'),
        deviceScaleRatio: 1,
      },
    },
  )
})
