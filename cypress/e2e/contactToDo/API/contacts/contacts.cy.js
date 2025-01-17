import {faker} from '@faker-js/faker';

function loginToDoUser(user) {
    return cy.request('POST', 'https://thinking-tester-contact-list.herokuapp.com/users/login', {
        email: `${user.user.email}`,
        password: `${user.password}`
    });
}


describe(['API'], "Add Contact to Contact List", () => {
  beforeEach(() => {
    // login with the user in the fixture user.json
    cy.fixture("contactsToDo/user.json").then((user) => {
      loginToDoUser(user).then((response) => {
        if (response.status === 401) {
          cy.refreshToken().then((newToken) => {
            cy.retryToDoPostRequestWithNewToken(
              newToken,
              "https://thinking-tester-contact-list.herokuapp.com/users/login",
              {
                email: `${user.user.email}`,
                password: `${user.password}`,
              }
            ).then((retryResponse) => {
              Cypress.env("token", retryResponse.body.token);
            });
          });
        } else {
          Cypress.env("token", response.body.token);
        }
      });
    });
  });

  afterEach(() => {
    // logout the user
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      url: "https://thinking-tester-contact-list.herokuapp.com/users/logout",
      method: "POST",
    };
    cy.request(requestOptions).then((response) => {
      if (response.status === 401) {
        cy.refreshToken().then((newToken) => {
          cy.retryToDoPostRequestWithNewToken(newToken, requestOptions.url, {}).then(
            (retryResponse) => {
              cy.wrap(retryResponse)
                .should("have.property", "status")
                .and("equal", 200);
            }
          );
        });
      } else {
        cy.wrap(response).should("have.property", "status").and("equal", 200);
      }
    });
  });

  it("fetch contact list", () => {
    // fetch the contact list
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
      method: "GET",
    };
    cy.request(requestOptions).then((response) => {
      cy.wrap(response).should("have.property", "status").and("equal", 200);
      cy.wrap(response.body)
        .its("length")
        .should("be.gte", 0)
        .log(`total number of contacts fetched: ${response.body.length}`);
    });
  });

  // add a new contact
  it("add a new contact", () => {
    const contact = {
      firstName: `${faker.person.firstName()}`,
      lastName: `${faker.person.lastName()}`,
      birthdate: `${faker.date.past(50).toISOString().split("T")[0]}`,
      email: `${faker.internet.email()}`,
      phone: `${faker.phone.number({ style: "national" })}`,
      street1: `${faker.location.streetAddress()}`,
      street2: `${faker.location.secondaryAddress()}`,
      city: `${faker.location.city()}`,
      stateProvince: `${faker.location.state()}`,
      postalCode: `${faker.location.zipCode()}`,
      country: `${faker.location.country()}`,
    };

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
      method: "POST",
      body: contact,
    };

    cy.request(requestOptions).then((response) => {
      cy.wrap(response).should("have.property", "status").and("equal", 201);
      cy.wrap(response.body)
        .should("have.property", "_id")
        .and("not.be.undefined");
    });
  });
});