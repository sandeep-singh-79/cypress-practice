// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('retryToDoPostRequestWithNewToken', (newToken, requestUrl, requestbody) => {
    return cy.request({
      method: "POST",
      url: requestUrl,
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
      body: requestbody,
    });
});

Cypress.Commands.add("refreshToken", () => {
  const user = require("../fixtures/contactsToDo/user.json");
  return cy
    .request(
      "POST",
      "https://thinking-tester-contact-list.herokuapp.com/users/login",
      {
        email: user.user.email,
        password: user.password,
      }
    )
    .then((response) => {
      const newToken = response.body.token;
      Cypress.env("token", newToken);
      return newToken;
    });
});