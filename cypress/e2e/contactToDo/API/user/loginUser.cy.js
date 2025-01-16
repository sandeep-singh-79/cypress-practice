describe('login User', () => {
    
    let user = require('../../../../fixtures/contactsToDo/user.json');
    it('login with valid credentials', () => {
        cy.request('POST', 'https://thinking-tester-contact-list.herokuapp.com/users/login', {
            email: `${user.user.email}`,
            password: `${user.password}`
        }).then((response) => {
            let logged_in_user = response.body;
            cy.wrap(logged_in_user)
                .should('have.property', 'token')
                .and('not.be.undefined');
            user.token = logged_in_user.token;
            Cypress.env('token', logged_in_user.token);
        });
    });

    it('logout user', () => {
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            },
            url: 'https://thinking-tester-contact-list.herokuapp.com/users/logout',
            method: 'POST',
        };
        cy.request(requestOptions).then((response) => {
            // if the token has expired then refresh the token and retry the request
            if (response.status === 401) {
                cy.refreshToken().then((newToken) => {
                    cy.retryToDoPostRequestWithNewToken(newToken, 
                        requestOptions.url, {
                            email: `${user.user.email}`,
                            password: `${user.password}`
                        }).then((retryResponse) => {
                            cy.wrap(retryResponse)
                                .should('have.property', 'status')
                                .and('equal', 200);
                            Cypress.env('token', newToken);
                    })
                })
            } else {
                cy.wrap(response)
                    .should('have.property', 'status')
                    .and('equal', 200);
            }
        });
    });
});