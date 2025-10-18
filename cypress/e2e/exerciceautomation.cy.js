describe('template spec', () => {

  it('create-and-delete-acount', function () {
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

});



import dataTest from '../fixtures/contactUs.json';

describe('Testes de formulário de contato', function () {
  let contactData;
  const validationMessages = {
    success: 'Success! Your details have been submitted successfully.',
    failure: 'Error! Invalid email address.'
  };

  before(function () {
    cy.fixture('contactUs').then(data => contactData = data);
  });

  it('Deve enviar um formulário de contato com anexo (formulário com fixture fora do escopo)', function () {
    const contactSuccess = "Success! Your details have been submitted successfully.";
    formSendContact(contactData, contactSuccess);
  });

  it('Deve enviar um formulário de contato com anexo (formulário dentro do escopo da fixture)', function () {
    cy.fixture('contactUs').then((data) => {
      formSendContact(data, validationMessages.success);
    });
  });

  it('Deve enviar um formulário de contato com anexo (fixture dentro do teste)', function () {
    cy.fixture('contactUs.json').as('massa');

    cy.get('@massa').then((massa) => {
      formSendContact(massa, validationMessages.success);
    });
  });

  it('Deve enviar um formulário de contato com anexo (fixture por import)', function () {
    formSendContact(dataTest, validationMessages.success);
  });

});

function formSendContact(data, expectedMessage) {
  cy.visit('https://automationexercise.com/contact_us')
  cy.get('[data-qa="name"]').clear().type(data.name);
  cy.get('[data-qa="email"]').clear().type(data.email);
  cy.get('[data-qa="subject"]').clear().type(data.subject);
  cy.get('[data-qa="message"]').clear().type(data.message);
  cy.get('input[name="upload_file"]').selectFile(data.file);
  cy.get('[data-qa="submit-button"]').click();
  cy.get('#contact-page .alert').should('have.text', expectedMessage);
  cy.get('#form-section span').should('be.visible');
}