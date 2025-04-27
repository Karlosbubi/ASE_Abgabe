describe('User Registration, Login, and Logout', () => {
  beforeEach(() => {
    // Sicherstellen, dass der 'CURRENT_USER' vor jedem Test nicht gesetzt ist.
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

    // Formular ausfüllen und registrieren
    cy.get('input[name="Email"]').type(user.email);
    cy.get('input[name="Username"]').type(user.username);
    cy.get('input[name="Password"]').type(user.password);
    cy.contains('Register Now').click();

    // Bestätigen, dass der Benutzer auf der richtigen Seite nach der Registrierung landet
    cy.url().should('eq', 'http://localhost:5173/');

    // Überprüfen, ob die Benutzerdaten im localStorage gespeichert sind
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

    // Eingegebene Login-Daten ausfüllen
    cy.get('input[name="Email"]').type(user.email);
    cy.get('input[name="Password"]').type(user.password);

    // Anmeldung abschicken
    cy.contains('Log In').click();

    // Bestätigen, dass die URL nach erfolgreichem Login korrekt ist
    cy.url().should('eq', 'http://localhost:5173/');

    // Überprüfen, ob der JWT korrekt gesetzt wurde
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
    // Log in the user before logging out
    cy.visit('/login');
    const user = {
      email: 'newuser@example.com',
      password: 'password123',
    };

    // Eingegebene Login-Daten ausfüllen
    cy.get('input[name="Email"]').type(user.email);
    cy.get('input[name="Password"]').type(user.password);

    // Anmeldung abschicken
    cy.contains('Log In').click();

    // Bestätigen, dass die URL nach erfolgreichem Login korrekt ist
    cy.url().should('eq', 'http://localhost:5173/');

    // Sicherstellen, dass der Benutzer erfolgreich eingeloggt ist
    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.not.be.null;
    });

    // Logout über den Navbar-Link auslösen
    cy.get('a').contains('Logout').click(); // Hier klicken wir auf den Logout-Link in der Navbar

    // Bestätigen, dass die URL nach dem Logout zurück zur Login-Seite führt
    cy.url().should('eq', 'http://localhost:5173/');

    // Überprüfen, ob die 'CURRENT_USER' im localStorage gelöscht wurde
    cy.window().then((win) => {
      const currentUser = win.localStorage.getItem('CURRENT_USER');
      expect(currentUser).to.be.null;
    });
  });
});