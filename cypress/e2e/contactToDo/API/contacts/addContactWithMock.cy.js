import { faker } from "@faker-js/faker";

const loginToDoUser = (user, pwd) => {
  return cy.request(
    "POST",
    "https://thinking-tester-contact-list.herokuapp.com/users/login",
    {
      email: `${user.user.email}`,
      password: pwd,
    }
  );
}

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

const contactRequestOptions = {
  headers: {
    Authorization: `Bearer ${Cypress.env("token")}`,
  },
  url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
  method: "POST",
  body: contact,
  failOnStatusCode: false,
};

const validateAddContactResponse = (response) => {
  cy.wrap(response).should("have.property", "status").and("equal", 201);
  cy.wrap(response.body).should("have.property", "_id").and("not.be.undefined");
};

describe(["API"], "Add contact - use mock login api", () => {
  let pwd = "";
  let user;

  beforeEach(() => {
    cy.fixture("contactsToDo/user.json").then((userData) => {
      user = userData;
      pwd = user.password;
      delete user.password;
      cy.log(`User: ${JSON.stringify(user)}`);

      cy.intercept(
        "POST",
        "https://thinking-tester-contact-list.herokuapp.com/users/login",
        (req) => {
          req.reply({
            statusCode: 200,
            body: {
              token: `${user.token}`,
              user: user,
            },
          });
        }
      ).as("loginRequest");

      loginToDoUser(user, pwd).then((res) => {
        Cypress.env("token", res.body.token);
      });
    });
  });

  it("Add a contact", () => {
    cy.request(contactRequestOptions).then((response) => {
      if (response.status === 401) {
        cy.refreshToken().then((newToken) => {
          cy.retryToDoPostRequestWithNewToken(
            newToken,
            contactRequestOptions.url,
            contact
          ).then((retryResponse) => {
            validateAddContactResponse(retryResponse);
          });
        });
      } else {
        validateAddContactResponse(response);
      }
    });
  });
});
