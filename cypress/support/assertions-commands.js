// ***********************************************
// Assertions Commands
// ***********************************************

// Account Assertions
Cypress.Commands.add('verifyAccountCreatedAndLogout', () => {
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
    cy.get('#header [href="/logout"]').should('be.visible');
});

Cypress.Commands.add('deleteAccount', () => {
    cy.get('#header [href="/delete_account"]').should('be.visible').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
    cy.get('#header [href="/login"]').should('be.visible');
});

// Address Assertions
Cypress.Commands.add('verifyDeliveryAddress', (address) => {
    cy.contains('#address_invoice li', `Mr. ${address.firstName} ${address.lastName}`).should('be.visible');
    cy.contains('#address_invoice li', address.company).should('be.visible');
    cy.contains('#address_invoice li', address.address1).should('be.visible');
    cy.contains('#address_invoice li', address.address2).should('be.visible');
    cy.contains('#address_invoice li', `${address.city} ${address.state} ${address.zipcode}`).should('be.visible');
    cy.contains('#address_invoice li', address.country).should('be.visible');
    cy.contains('#address_invoice li', address.mobileNumber).should('be.visible');
});