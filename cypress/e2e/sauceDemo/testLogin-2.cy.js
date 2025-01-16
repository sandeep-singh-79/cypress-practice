// Import login page object
import { loginPage } from "../../pages/sauceDemo/loginPage";
import loginDetails from "../../fixtures/sauceDemo/loginDetails.json";

describe("Login Tests", () => {
  beforeEach(() => {
    // Clear application state before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // Visit the login page
    loginPage.visit();
  });

  afterEach(() => {
    // Only attempt to log out if the test involves a valid login
    if (Cypress.currentTest.title.includes("login with valid credentials")) {
      cy.get("#react-burger-menu-btn").click();
      cy.get("#logout_sidebar_link").click();
    }
      cy.wait(2000);
      cy.window().then((win) => {
        win.localStorage.clear();
        win.sessionStorage.clear();
        expect(win.localStorage.length).to.eq(0);
        expect(win.sessionStorage.length).to.eq(0);
      });
  });

  // Scenario 1: Valid login
  it("login with valid credentials", () => {
    loginPage.login(loginDetails.validUsername, loginDetails.validPassword);
    cy.url().should("contain", "inventory");
  });

  // Scenario 2: Ensure login page loads in under 5 seconds
  it("should fail if login page does not load in 5 seconds", () => {
    cy.clock(); // Use clock to measure time
    loginPage.login(
      loginDetails.invalidUserNames.performanceGlitchUser,
      loginDetails.validPassword
    );
    cy.tick(5000); // Simulate 5 seconds passing
    cy.url().should("not.contain", "inventory");
    cy.clock().invoke("restore"); // Restore the real clock
  });

  // Scenario 3: Invalid credentials
  it("error displayed on entering invalid username/password", () => {
    loginDetails.invalidUserNames.forEach((username) => {
      loginPage.login(username, loginDetails.validPassword);
      loginPage
        .getErrorMessage()
        .should(
          "contain",
          "Epic sadface: Username and password do not match any user in this service"
        );
    });
  });
});