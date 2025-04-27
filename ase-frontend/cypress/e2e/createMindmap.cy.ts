describe('Mindmap creation tests', () => {
    let newMindmapId: number;
    let newMindmapTitle: string;

    before(() => {
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
    });

    it('should allow the user to create a mindmap and display it in the list', () => {
        const apiUrl = Cypress.env('apiUrl');

        cy.intercept('POST', `${apiUrl}/mindmap`).as('createMindmapRequest');

        cy.get('button').contains('Create').click();

        cy.wait('@createMindmapRequest').then((interception) => {
            if (interception.response && interception.response.body) {
                const response = interception.response.body;
                newMindmapId = response.id;
                newMindmapTitle = response.title;

                if (typeof newMindmapTitle === 'string') {
                    cy.get('.space-y-2')
                        .contains(newMindmapTitle)
                        .should('exist');
                } else {
                    throw new Error('newMindmapTitle is not a string');
                }

                if (typeof newMindmapId === 'number') {
                    cy.get('.space-y-2')
                        .find(`[data-id="${newMindmapId}"]`)
                        .should('exist');
                }
            } else {
                throw new Error('No response received for the mindmap creation request.');
            }
        });
    });
});