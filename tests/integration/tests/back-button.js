it('Back button works', () => {
  // Ensure screen is large enough for desktop menu.
  cy.viewport('macbook-15')

  // First visit target page to ensure it's build for client navigation.
  cy.visit('/letter/s')
  cy.visit('/word/skilja')

  // Start main test.
  cy.visit('/letter/s')
  cy.wait(5000)

  // Got o a word page.
  cy.contains('skilja').click();
  cy.location('pathname').should('equal', '/word/skilja')

  // Try to go back using "back" button.
  cy.contains('Back').click()
  cy.location('pathname').should('equal', '/letter/s')
})
