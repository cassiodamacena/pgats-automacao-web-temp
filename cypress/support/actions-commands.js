// ***********************************************
// Actions Commands
// ***********************************************

// Navigation Commands
Cypress.Commands.add('goToSignupLogin', () => {
    cy.visit('/');
    cy.get('#header [href="/login"]').click();
});

Cypress.Commands.add('goToContactUs', () => {
    cy.visit('/');
    cy.get('#header a[href="/contact_us"]').should('be.visible').click();
});

Cypress.Commands.add('goToTestCases', () => {
    cy.visit('/');
    cy.get('#header a[href="/test_cases"]').should('be.visible').click();
});

Cypress.Commands.add('goToProducts', () => {
    cy.visit('/');
    cy.get('#header a[href="/products"]').should('be.visible').click();
});

// Form Actions
Cypress.Commands.add('fillLoginForm', (usuario) => {
    cy.get('[data-qa="login-email"]').clear().type(usuario.email);
    cy.get('[data-qa="login-password"]').clear().type(usuario.password);
    cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('fillNewUserForm', (usuario) => {
    cy.visit('/');
    cy.get('#header [href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(usuario.name);
    cy.get('[data-qa="signup-email"]').type(usuario.email);
    cy.get('[data-qa="signup-button"]').click();
});

Cypress.Commands.add('fillSignupForm', (usuario) => {
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(usuario.password);
    cy.get('[data-qa="days"]').select(usuario.dateOfBirth.day);
    cy.get('[data-qa="months"]').select(usuario.dateOfBirth.month);
    cy.get('[data-qa="years"]').select(usuario.dateOfBirth.year);
    cy.get('[name="newsletter"]').check();
    cy.get('[name="optin"]').check();

    // Preencher informações de endereço
    cy.get('[data-qa="first_name"]').type(usuario.address.firstName);
    cy.get('[data-qa="last_name"]').type(usuario.address.lastName);
    cy.get('[data-qa="company"]').type(usuario.address.company);
    cy.get('[data-qa="address"]').type(usuario.address.address1);
    cy.get('[data-qa="address2"]').type(usuario.address.address2);
    cy.get('[data-qa="country"]').select(usuario.address.country);
    cy.get('[data-qa="state"]').type(usuario.address.state);
    cy.get('[data-qa="city"]').type(usuario.address.city);
    cy.get('[data-qa="zipcode"]').type(usuario.address.zipcode);
    cy.get('[data-qa="mobile_number"]').type(usuario.address.mobileNumber);
    cy.get('[data-qa="create-account"]').click();
});

Cypress.Commands.add('fillContactForm', (name, email, subject, message) => {
    cy.get('[data-qa="name"]').click().type(name);
    cy.get('[data-qa="email"]').type(email);
    cy.get('[data-qa="subject"]').click().type(subject);
    cy.get('[data-qa="message"]').click().type(message);
    cy.get('[data-qa="submit-button"]').should('be.visible').click();
});

// Account Actions
Cypress.Commands.add('logout', () => {
    cy.get('#header a[href="/logout"]').should('be.visible').click();
});

// Product Actions
Cypress.Commands.add('searchProduct', (productName) => {
    cy.get('[name="search"]').click().type(productName);
    cy.get('#submit_search i.fa').click();
});

Cypress.Commands.add('viewProductDetails', (productId) => {
    cy.get(`a[href="/product_details/${productId}"]`).click();
});

// Subscription Actions
Cypress.Commands.add('subscribe', (email) => {
    cy.get('#footer h2').should('have.text', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').should('be.visible').click().type(email);
    cy.get('#subscribe i.fa').click();
});

// Checkout Actions
Cypress.Commands.add('addProductToCart', (productId, verifyModal = true) => {
    cy.get(`a[href="/product_details/${productId}"]`).click();
    cy.get('div.product-information h2').should('be.visible');
    cy.contains('button.cart', 'Add to cart').should('be.visible').click();
    if (verifyModal) {
        cy.get('#cartModal h4.modal-title').should('have.text', 'Added!');
        cy.get('#cartModal u').should('have.text', 'View Cart').click();
    }
});

Cypress.Commands.add('proceedToCheckout', () => {
    cy.get('#cart_items li.active').should('have.text', 'Shopping Cart');
    cy.get('#do_action a.btn').should('have.text', 'Proceed To Checkout').click();
});

Cypress.Commands.add('fillOrderMessage', (message) => {
    cy.get('#ordermsg [name="message"]').click().type(message);
});

Cypress.Commands.add('fillPaymentDetails', (payment) => {
    cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard);
    cy.get('[data-qa="card-number"]').type(payment.cardNumber);
    cy.get('[data-qa="cvc"]').type(payment.cvc);
    cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth);
    cy.get('[data-qa="expiry-year"]').type(payment.expiryYear);
});