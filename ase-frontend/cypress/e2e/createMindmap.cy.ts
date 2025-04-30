import {GetCurrentUser} from "@/utils/storageWrapper";

describe('Mindmap creation tests', () => {
    let newMindmapId: number;
    let newMindmapTitle: string;

    before(() => {
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
    });

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

    it('should allow the user to create a mindmap and display it in the list', () => {
        const apiUrl = Cypress.env('apiUrl');

        cy.intercept('POST', `${apiUrl}/mindmap`).as('createMindmapRequest');

        cy.get('[data-testid="create-mindmap-button"]').click();

        cy.wait('@createMindmapRequest').then((interception) => {
            if (interception.response && interception.response.body) {
                const response = interception.response.body;
                newMindmapId = response.id;
                newMindmapTitle = response.title;

                if (typeof newMindmapTitle === 'string') {
                    cy.get('[data-testid="mindmap-list-own"]')
                        .contains(newMindmapTitle)
                        .should('exist');
                } else {
                    throw new Error('newMindmapTitle is not a string');
                }

                if (typeof newMindmapId === 'number') {
                    cy.get('[data-testid="mindmap-list-own"]')
                        .find(`[data-id="${newMindmapId}"]`)
                        .should('exist');
                }
            } else {
                throw new Error('No response received for the mindmap creation request.');
            }
        });
    });
});