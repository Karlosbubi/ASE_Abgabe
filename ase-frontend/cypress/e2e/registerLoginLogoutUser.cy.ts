describe('User Registration, Login, and Logout', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('CURRENT_USER');
    });
  });

  it('should register a new user and verify user is stored in localStorage', () => {
    cy.visit('/login');
    cy.contains('Register now').click();

    const user = {
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'password123',
    };

    cy.get('input[name="Email"]').type(user.email);
    cy.get('input[name="Username"]').type(user.username);
    cy.get('input[name="Password"]').type(user.password);
    cy.contains('Register Now').click();

    cy.url().should('eq', 'http://localhost:5173/');

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
    cy.visit('/login');

    const user = {
      email: 'newuser@example.com',
      password: 'password123',
    };

    cy.get('input[name="Email"]').type(user.email);
    cy.get('input[name="Password"]').type(user.password);

    cy.contains('Log In').click();

    cy.url().should('eq', 'http://localhost:5173/');

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
    cy.visit('/login');
    const user = {
      email: 'newuser@example.com',
      password: 'password123',
    };

    cy.get('input[name="Email"]').type(user.email);
    cy.get('input[name="Password"]').type(user.password);

    cy.contains('Log In').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.not.be.null;
    });

    cy.get('a').contains('Logout').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.be.null;
    });
  });
});