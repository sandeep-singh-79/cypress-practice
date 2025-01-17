import signUpDetails from "../../fixtures/contactsToDo/signUpDetails.json";
import { contactListPage } from "../../pages/contactToDo/contactsListPage";
import { todoLoginPage } from "../../pages/contactToDo/loginPage";
import { signUpPage } from "../../pages/contactToDo/signUp";

describe(['SignUp_UI'], "Contact To Do Sign Up Tests", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    if (Cypress.currentTest.title != "login with valid credentials")
      cy.visit("/addUser");
    else cy.visit("/");
  });

  it.skip("sign up with valid credentials", () => {
    signUpPage.signUp(
      signUpDetails.firstName,
      signUpDetails.lastName,
      signUpDetails.email,
      signUpDetails.password
    );
    cy.url().should("contain", "/contactList");
    contactListPage.isEmptyOnFirstLogin().should("be.true");
    contactListPage.logout();
    cy.url().should("not.contain", "/contactList");
    cy.get(todoLoginPage.elements.signupLink).should("be.visible");
  });

  it("login with valid credentials", () => {
    todoLoginPage.login(signUpDetails.email, signUpDetails.password);
    cy.url().should("contain", "/contactList");

    contactListPage.logout();
    cy.url().should("not.contain", "/contactList");
  });

  it("error on signing up with existing email", () => {
    signUpPage.signUp(
      signUpDetails.firstName,
      signUpDetails.lastName,
      signUpDetails.email,
      signUpDetails.password
    );
    signUpPage
      .getErrorMessage()
      .should("contain", "Email address is already in use");
  });
});
