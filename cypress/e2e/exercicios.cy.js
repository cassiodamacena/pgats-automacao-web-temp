
import testData from '../fixtures/testData.json';


describe('Automation Exercise - Test Cases', function () {

  const { users } = testData;

  it('Test Case 1: Register User', function () {

    const novoUsuario = users.new

    cy.goToSignupLogin();
    cy.fillNewUserForm(novoUsuario);
    cy.fillSignupForm(novoUsuario);
    cy.verifyAccountCreatedAndLogout();
    cy.deleteAccount();
  });

  it('Test Case 2-4: Login User with correct email and password and Logout User', function () {
    const usuarioExistente = users.existing;
    
    cy.goToSignupLogin();
    cy.fillLoginForm(usuarioExistente);
    
    // Verificar login bem-sucedido
    cy.get('#header b').should('have.text', usuarioExistente.name);
    cy.logout();

    // Verificar logout bem-sucedido
    cy.get('#header a[href="/login"]').should('be.visible');
  });

  it('Test Case 3: Login User with incorrect email and password', function () {
    const usuarioExistente = users.existing;
    usuarioExistente.password = 'senha-inválida';
    
    cy.goToSignupLogin();
    cy.fillLoginForm(usuarioExistente);
    
    // Verificar dados inválidos para login
    cy.get('#form p').should('have.text', 'Your email or password is incorrect!');
  });

  it('Test Case 5: Register User with existing email', function () {
    const usuarioExistente = users.existing;
    
    cy.goToSignupLogin();
    cy.fillNewUserForm(usuarioExistente);

    // Verificar mensagem de e-mail já existente
    cy.get('#form p').should('have.text', 'Email Address already exist!');
  });

  it('Test Case 6: Contact Us Form', function () {
    const novoUsuario = users.new;
    const contactData = {
      name: novoUsuario.name,
      email: novoUsuario.email,
      subject: 'Assunto contato aqui',
      message: 'Mensagem do contato aqui'
    };

    cy.goToContactUs();
    
    cy.fillContactForm(
      contactData.name,
      contactData.email,
      contactData.subject,
      contactData.message
    );

    // Verificar sucesso do envio
    cy.get('#contact-page div.alert')
      .should('have.text', 'Success! Your details have been submitted successfully.');
    cy.get('#form-section a.btn').should('have.text', ' Home');
  });

  it('Test Case 7 - Verify Test Cases Page', function () {
    cy.goToTestCases();
    cy.get('#form b').should('have.text', 'Test Cases');
  });

  it('Test Case 8 - Verify All Products and product detail page', function () {
    // Navegar para produtos e verificar listagem
    cy.goToProducts();
    cy.get('h2.title').should('have.text', 'All Products');
    cy.get('div.features_items').should('be.visible');

    // Verificar detalhes do produto
    cy.viewProductDetails(1);
    cy.get('div.product-information h2').should('have.text', 'Blue Top');
    cy.get('p:nth-child(3)').should('have.text', 'Category: Women > Tops');
    cy.get('span:nth-child(5) span').should('have.text', 'Rs. 500');
    cy.get('p:nth-child(6)').should('have.text', 'Availability: In Stock');
    cy.get('p:nth-child(7)').should('be.visible');
    cy.get('p:nth-child(8)').should('be.visible');
  });

  it('Test Case 9 - Search Product', function () {
    // Navegar para produtos e realizar busca
    cy.goToProducts();
    cy.get('h2.title').should('have.text', 'All Products');
    
    // Buscar produto específico
    cy.searchProduct('Blue Top');
    
    // Verificar resultado da busca
    cy.get('h2.title').should('have.text', 'Searched Products');
    cy.contains('.productinfo p', "Blue Top").should('be.visible');
  });

  it('Test Case 10: Verify Subscription in home page', function () {
    cy.visit('/');
    cy.subscribe(users.existing.email);
    
    // Verificar mensagem de sucesso
    cy.get('#success-subscribe div.alert')
      .should('have.text', 'You have been successfully subscribed!')
      .should('be.visible');
  });

  it('Test Case 15: Place Order: Register before Checkout', function () {
    const usuarioCheckout = users.checkout;

    // Registra um novo usuário
    cy.goToSignupLogin();
    cy.fillNewUserForm(usuarioCheckout);
    cy.fillSignupForm(usuarioCheckout);
    cy.verifyAccountCreatedAndLogout();

    // Adiciona produto ao carrinho e procede para checkout
    cy.addProductToCart(1);
    cy.proceedToCheckout();

    // Verifica dados de entrega
    cy.get('#address_invoice h3.page-subheading').should('have.text', 'Your billing address');
    cy.verifyDeliveryAddress(usuarioCheckout.address);
    cy.fillOrderMessage(usuarioCheckout.message);

    // Processa pagamento
    cy.get('#cart_items a.btn').should('have.text', 'Place Order').click();
    cy.fillPaymentDetails(usuarioCheckout.payment);
    cy.get('#payment-form').then($form => {
      $form[0].addEventListener('submit', (e) => e.preventDefault());
    });
    cy.get('[data-qa="pay-button"]').should('be.enabled').click();
    cy.get('#success_message .alert-success')
      .should('be.visible')
      .and('contain.text', 'Your order has been placed successfully!');

    // Validação final do pagamento
    cy.visit('/payment_done/500');
    cy.url().should('include', '/payment_done/');
    cy.get('#form p')
      .should('be.visible')
      .and('contain.text', 'Congratulations! Your order has been confirmed!');

    // Deleta a conta
    cy.deleteAccount();
  });

});