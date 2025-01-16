import { faker } from '@faker-js/faker';

const createRandomUserBody = () => {
    return {
        email: `${faker.internet.email()}`,
        password: `${faker.internet.password()}`,
        firstName: `${faker.person.firstName()}`,
        lastName: `${faker.person.lastName()}`,
    };
};

describe('Add User', () => {
    it('create a new user', () => {
        let user = createRandomUserBody();
        cy.request('POST', 'https://thinking-tester-contact-list.herokuapp.com/users', user).then((response) => {
            let newUser = response.body;
            newUser.password = user.password;
            cy.writeFile('cypress/fixtures/contactsToDo/user.json', newUser);
            Cypress.env('token', newUser.token);
        });
    });
});