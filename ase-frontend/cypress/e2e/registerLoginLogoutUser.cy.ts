describe('User Registration, Login, and Logout', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('CURRENT_USER');
    });
  });

  it('should register a new user and verify user is stored in localStorage', () => {
    const websiteUrl = Cypress.env('websiteUrl');

    cy.visit('/login');
    cy.get('[data-testid="register-now-link"]').click();

    const user = {
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'password123',
    };

    cy.get('[data-testid="register-email-input"]').type(user.email);
    cy.get('[data-testid="register-name-input"]').type(user.username);
    cy.get('[data-testid="register-password-input"]').type(user.password);
    cy.get('[data-testid="register-now-button"]').click();

    cy.url().should('eq', `${websiteUrl}/`);

    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.not.be.null;

      if (currentUser) {
        const userFromStorage = JSON.parse(currentUser);
        expect(userFromStorage).to.have.property('id');
        expect(userFromStorage).to.have.property('name', user.username);
        expect(userFromStorage).to.have.property('email', user.email);
        expect(userFromStorage.JWT).to.not.be.null;
        expect(userFromStorage.JWT).to.not.equal('');
      }
    });
  });

  it('should log in the newly registered user and verify login', () => {
    const websiteUrl = Cypress.env('websiteUrl');

    cy.visit('/login');

    const user = {
      email: 'newuser@example.com',
      password: 'password123',
    };

    cy.get('[data-testid="login-email-input"]').type(user.email);
    cy.get('[data-testid="login-password-input"]').type(user.password);

    cy.get('[data-testid="log-in-button"]').click();

    cy.url().should('eq', `${websiteUrl}/`);

    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.not.be.null;

      if (currentUser) {
        const userFromStorage = JSON.parse(currentUser);
        expect(userFromStorage.JWT).to.not.be.null;
        expect(userFromStorage.JWT).to.not.equal('');
      }
    });
  });

  it('should log out the user and verify localStorage is cleared', () => {
    const websiteUrl = Cypress.env('websiteUrl');

    cy.visit('/login');
    const user = {
      email: 'newuser@example.com',
      password: 'password123',
    };

    cy.get('[data-testid="login-email-input"]').type(user.email);
    cy.get('[data-testid="login-password-input"]').type(user.password);

    cy.get('[data-testid="log-in-button"]').click();

    cy.url().should('eq', `${websiteUrl}/`);

    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.not.be.null;
    });

    cy.get('[data-testid="logout-link"]').click();

    cy.url().should('eq', `${websiteUrl}/`);

    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.be.null;
    });
  });
});