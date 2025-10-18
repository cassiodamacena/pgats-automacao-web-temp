it('1 - Register User', function () {
  cy.visit('https://automationexercise.com/');
  cy.get('#header [href="/login"]').click();

  // Cadastro inicial
  cy.get('[data-qa="signup-name"]').type('cassio');
  cy.get('[data-qa="signup-email"]').type('cassio@email.com.br');
  cy.get('[data-qa="signup-button"]').click();

  // Formulário de criação de conta
  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]').type('cassio');
  cy.get('[data-qa="days"]').select('1');
  cy.get('[data-qa="months"]').select('5');
  cy.get('[data-qa="years"]').select('1987');
  cy.get('[name="newsletter"]').check();
  cy.get('[name="optin"]').check();
  cy.get('[data-qa="first_name"]').type('cassio');
  cy.get('[data-qa="last_name"]').type('damacena');
  cy.get('[data-qa="company"]').type('QA Consulting LTDA');
  cy.get('[data-qa="address"]').type('Endereço 1');
  cy.get('[data-qa="address2"]').type('Endereço 2');
  cy.get('[data-qa="country"]').select('United States');
  cy.get('[data-qa="state"]').type('FL');
  cy.get('[data-qa="city"]').type('MIAMI');
  cy.get('[data-qa="zipcode"]').type('10123456');
  cy.get('[data-qa="mobile_number"]').type('12912345678');
  cy.get('[data-qa="create-account"]').click();

  // Confirmação de conta criada
  cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
  cy.get('[data-qa="continue-button"]').should('be.visible').click();

  // Logout e exclusão de conta
  cy.get('#header [href="/logout"]').should('be.visible');
  cy.get('#header [href="/delete_account"]').should('be.visible').click();
  cy.get('[data-qa="account-deleted"]').should('be.visible');
  cy.get('[data-qa="continue-button"]').should('be.visible').click();

  // Verificação final
  cy.get('#header [href="/login"]').should('be.visible');

});

it('2-4 - Login User with correct email and password and Logout User', function () {
  cy.visit('https://automationexercise.com/')
  cy.get('#header a[href="/login"]').should('be.visible');
  cy.get('#header a[href="/login"]').click();
  cy.get('#form div.login-form h2').should('be.visible');
  cy.get('[data-qa="login-email"]').click().type('cassio-login@email.com.br');
  cy.get('[data-qa="login-password"]').click().type('cassio123');
  cy.get('[data-qa="login-button"]').click();
  cy.get('#header b').should('have.text', 'cassio-login');
  cy.get('#header a[href="/logout"]').should('be.visible').click();
  cy.get('#header a[href="/login"]').should('be.visible');
});

it('3 - Login User with incorrect email and password', function () {
  cy.visit('https://automationexercise.com/')
  cy.get('#header a[href="/login"]').should('be.visible');
  cy.get('#header a[href="/login"]').click();
  cy.get('#form div.login-form h2').should('be.visible');
  cy.get('[data-qa="login-email"]').click().type('cassio-login@email.com.br');
  cy.get('[data-qa="login-password"]').click().type('cassio1234');
  cy.get('[data-qa="login-button"]').click();
  cy.get('#form p').should('have.text', 'Your email or password is incorrect!');
});

it('5 - Register User with existing email', function () {
  cy.visit('https://automationexercise.com/');
  cy.get('#header [href="/login"]').click();
  
  // Cadastro inicial
  cy.get('[data-qa="signup-name"]').type('cassio-login');
  cy.get('[data-qa="signup-email"]').type('cassio-login@email.com.br');
  cy.get('[data-qa="signup-button"]').click();
  cy.get('#form p').should('have.text', 'Email Address already exist!');
});

it('6 - Contact Us Form', function() {
  cy.visit('https://automationexercise.com/')
  cy.get('#header a[href="/contact_us"]').should('be.visible');
  cy.get('#header a[href="/contact_us"]').click();
  cy.get('[data-qa="name"]').click().type('Cassio');
  cy.get('[data-qa="email"]').type('cassio@email.com.br');
  cy.get('[data-qa="subject"]').click().type('Assunto contato aqui');
  cy.get('[data-qa="message"]').click().type('Mensagem do contato aqui');
  cy.get('#contact-us-form [name="upload_file"]').click();
  cy.get('[data-qa="submit-button"]').should('be.visible').click();
  cy.get('#contact-page div.alert').should('have.text', 'Success! Your details have been submitted successfully.');
  cy.get('#form-section a.btn').should('have.text', ' Home');
  
});

it('7 - Verify Test Cases Page', function() {
  cy.visit('https://automationexercise.com/')
  cy.get('#header a[href="/"]').should('have.text', ' Home');
  cy.get('#header a[href="/test_cases"]').should('have.text', ' Test Cases').click();
  cy.get('#form b').should('have.text', 'Test Cases');
});

it('8 - Verify All Products and product detail page', function() {
  cy.visit('https://automationexercise.com/')
  cy.get('#header a[href="/"]').should('have.text', ' Home');
  cy.get('#header a[href="/products"]').should('have.text', ' Products').click();
  cy.get('h2.title').should('have.text', 'All Products');
  cy.get('div.features_items').should('be.visible');
  cy.get('a[href="/product_details/1"]').should('be.visible');
  cy.get('a[href="/product_details/1"]').click();
  cy.get('div.product-information h2').should('have.text', 'Blue Top');
  cy.get('p:nth-child(3)').should('have.text', 'Category: Women > Tops');
  cy.get('span:nth-child(5) span').should('have.text', 'Rs. 500');
  cy.get('p:nth-child(6)').should('have.text', 'Availability: In Stock');
  cy.get('p:nth-child(7)').should('be.visible');
  cy.get('p:nth-child(8)').should('be.visible');
  
});