// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando para navegar até a página de Login e Registro
Cypress.Commands.add('goToSignupLogin', () => {
    cy.visit('/');
    cy.get('#header [href="/login"]').click();
});

// Comando para navegar até a página de contato
Cypress.Commands.add('goToContactUs', () => {
    cy.visit('/');
    cy.get('#header a[href="/contact_us"]').should('be.visible').click();
});

// Comando para efetuar login
Cypress.Commands.add('fillLoginForm', (email, password) => {
    cy.get('[data-qa="login-email"]').clear().type(email);
    cy.get('[data-qa="login-password"]').clear().type(password);
    cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('fillNewUserForm', (name, email) => {
    cy.visit('/');
    cy.get('#header [href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
});

// Comando para preencher o formulário de registro
Cypress.Commands.add('fillSignupForm', (userData, address) => {
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(userData.password);
    cy.get('[data-qa="days"]').select(userData.dateOfBirth.day);
    cy.get('[data-qa="months"]').select(userData.dateOfBirth.month);
    cy.get('[data-qa="years"]').select(userData.dateOfBirth.year);
    cy.get('[name="newsletter"]').check();
    cy.get('[name="optin"]').check();

    // Preencher informações de endereço
    cy.get('[data-qa="first_name"]').type(address.firstName);
    cy.get('[data-qa="last_name"]').type(address.lastName);
    cy.get('[data-qa="company"]').type(address.company);
    cy.get('[data-qa="address"]').type(address.address1);
    cy.get('[data-qa="address2"]').type(address.address2);
    cy.get('[data-qa="country"]').select(address.country);
    cy.get('[data-qa="state"]').type(address.state);
    cy.get('[data-qa="city"]').type(address.city);
    cy.get('[data-qa="zipcode"]').type(address.zipcode);
    cy.get('[data-qa="mobile_number"]').type(address.mobileNumber);
    cy.get('[data-qa="create-account"]').click();
});

// Comando para verificar conta criada e fazer logout
Cypress.Commands.add('verifyAccountCreatedAndLogout', () => {
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
    cy.get('#header [href="/logout"]').should('be.visible');
});

// Comando para deletar conta
Cypress.Commands.add('deleteAccount', () => {
    cy.get('#header [href="/delete_account"]').should('be.visible').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
    cy.get('#header [href="/login"]').should('be.visible');
});

// Comando para efetuar logout
Cypress.Commands.add('logout', () => {
    cy.get('#header a[href="/logout"]').should('be.visible').click();
});

// Comando para preencher e enviar formulário de contato
Cypress.Commands.add('fillContactForm', (name, email, subject, message) => {
    cy.get('[data-qa="name"]').click().type(name);
    cy.get('[data-qa="email"]').type(email);
    cy.get('[data-qa="subject"]').click().type(subject);
    cy.get('[data-qa="message"]').click().type(message);
    cy.get('[data-qa="submit-button"]').should('be.visible').click();
});

// Comando para navegar até a página de casos de teste
Cypress.Commands.add('goToTestCases', () => {
    cy.visit('/');
    cy.get('#header a[href="/test_cases"]').should('be.visible').click();
});

// Comando para navegar até a página de produtos
Cypress.Commands.add('goToProducts', () => {
    cy.visit('/');
    cy.get('#header a[href="/products"]').should('be.visible').click();
});

// Comando para filtrar produtos
Cypress.Commands.add('searchProduct', (productName) => {
    cy.get('[name="search"]').click().type(productName);
    cy.get('#submit_search i.fa').click();
});

// Comando para visualizar detalhes do produto
Cypress.Commands.add('viewProductDetails', (productId) => {
    cy.get(`a[href="/product_details/${productId}"]`).click();
});

// Comando para subscrição de newsletter
Cypress.Commands.add('subscribe', (email) => {
    cy.get('#footer h2').should('have.text', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').should('be.visible').click().type(email);
    cy.get('#subscribe i.fa').click();
});

// Comandos para adicionar produto ao carrinho
Cypress.Commands.add('addProductToCart', (productId, verifyModal = true) => {
    cy.get(`a[href="/product_details/${productId}"]`).click();
    cy.get('div.product-information h2').should('be.visible');
    cy.contains('button.cart', 'Add to cart').should('be.visible').click();
    if (verifyModal) {
        cy.get('#cartModal h4.modal-title').should('have.text', 'Added!');
        cy.get('#cartModal u').should('have.text', 'View Cart').click();
    }
});

// Comando para processar checkout
Cypress.Commands.add('proceedToCheckout', () => {
    cy.get('#cart_items li.active').should('have.text', 'Shopping Cart');
    cy.get('#do_action a.btn').should('have.text', 'Proceed To Checkout').click();
});

// Comando para preencher mensagem do pedido
Cypress.Commands.add('fillOrderMessage', (message) => {
    cy.get('#ordermsg [name="message"]').click().type(message);
});

// Comando para verificação do endereço de entrega no checkout
Cypress.Commands.add('verifyDeliveryAddress', (address) => {
    cy.contains('#address_invoice li', `Mr. ${address.firstName} ${address.lastName}`).should('be.visible');
    cy.contains('#address_invoice li', address.company).should('be.visible');
    cy.contains('#address_invoice li', address.address1).should('be.visible');
    cy.contains('#address_invoice li', address.address2).should('be.visible');
    cy.contains('#address_invoice li', `${address.city} ${address.state} ${address.zipcode}`).should('be.visible');
    cy.contains('#address_invoice li', address.country).should('be.visible');
    cy.contains('#address_invoice li', address.mobileNumber).should('be.visible');
});

// Comando para preencher detalhes de pagamento
Cypress.Commands.add('fillPaymentDetails', (payment) => {
    cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard);
    cy.get('[data-qa="card-number"]').type(payment.cardNumber);
    cy.get('[data-qa="cvc"]').type(payment.cvc);
    cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth);
    cy.get('[data-qa="expiry-year"]').type(payment.expiryYear);
});