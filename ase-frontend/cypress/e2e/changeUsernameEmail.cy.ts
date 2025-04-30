import {GetCurrentUser} from "@/utils/storageWrapper";

describe('User information change tests', () => {
  let currentUser: any

  after(() => {
    const apiUrl = Cypress.env('apiUrl');
    const user = GetCurrentUser();

    if (user && user.JWT) {
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/user`,
        headers: {
          Authorization: `Bearer ${user.JWT}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    }
  });

  it('should update the current users personal information and keep the authorization token', () => {
    const websiteUrl = Cypress.env('websiteUrl');

    cy.visit('/login');
    cy.get('[data-testid="register-now-link"]').click();

    const user = {
      email: 'e2etestuser@example.com',
      username: 'e2etestuser',
      password: 'E2ETest123!',
    };

    cy.get('[data-testid="register-email-input"]').type(user.email);
    cy.get('[data-testid="register-name-input"]').type(user.username);
    cy.get('[data-testid="register-password-input"]').type(user.password);
    cy.get('[data-testid="register-now-button"]').click();

    cy.url().should('eq', `${websiteUrl}/`);

    cy.window().then((win) => {
      const currentUserString = win.localStorage.getItem("CURRENT_USER");
      currentUser = currentUserString ? JSON.parse(currentUserString) : null;
      expect(currentUser).to.not.be.null;
    });

    cy.get('[data-testid="dashboard-link"]').click();

    cy.url().should('eq', `${websiteUrl}/dashboard`);

    cy.get('[data-testid="change-info-link"]').click();
    cy.get('[data-testid="change-email-checkbox"]').click();
    cy.get('[data-testid="change-username-checkbox"]').click();

    const newUser = {
      username: 'updatede2etestuser',
      email: 'updatede2etestuser@example.com',
      password: 'E2ETest123!',
    };

    cy.get('[data-testid="change-email-input"]').clear();
    cy.get('[data-testid="change-email-input"]').type(newUser.email);
    cy.get('[data-testid="change-username-input"]').clear();
    cy.get('[data-testid="change-username-input"]').type(newUser.username);

    cy.get('[data-testid="change-info-save-button"]').click();

    cy.get('[data-testid="dashboard-email"]')
        .should('have.value', newUser.email);
    cy.get('[data-testid="dashboard-username"]')
        .should('have.value', newUser.username);

    cy.window().then((win) => {
      const updatedUserString = win.localStorage.getItem("CURRENT_USER");
      const updatedUser = updatedUserString ? JSON.parse(updatedUserString) : null;
      expect(updatedUser).to.not.be.null;
      expect(updatedUser.JWT).to.equal(currentUser.JWT);
    });
  })
});