// import login page object
import { loginPage } from "../../pages/sauceDemo/loginPage";
import loginDetails from "../../fixtures/sauceDemo/loginDetails.json";

describe('Login Tests', () => {
    describe("user with valid credentials should be able to login", () => {
      beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
        loginPage.visit();
      });


      afterEach(() => {
        cy.get("#react-burger-menu-btn").click();
        cy.get("#logout_sidebar_link").click();
        cy.wait(2000);
        cy.window().then((win) => {
          win.localStorage.clear();
          win.sessionStorage.clear();
          expect(win.localStorage.length).to.eq(0);
          expect(win.sessionStorage.length).to.eq(0);
        });
      });

      it("login with valid credentials", () => {
        loginPage.login(loginDetails.validUsername, loginDetails.validPassword);
        cy.url().should("contain", "inventory");
      });
    });

    describe("Content page should load in 5 seconds", () => {
      beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
        loginPage.visit();
      });

      afterEach(() => {
        cy.window().then((win) => {
          win.localStorage.clear();
          win.sessionStorage.clear();
          expect(win.localStorage.length).to.eq(0);
          expect(win.sessionStorage.length).to.eq(0);
        });
      });

      it(
        "should fail if login page does not load in 5 seconds",
        () => {
          loginPage.login(
            loginDetails.invalidUserNames.performanceGlitchUser,
            loginDetails.validPassword
          );
          cy.tick(5000);
          cy.url().should("not.contain", "inventory");
          cy.clock().invoke('restore');
        }
      );
    });

    describe("login with invalid credentials", () => {
      beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
        loginPage.visit();
      });

      afterEach(() => {
        cy.window().then((win) => {
          win.localStorage.clear();
          win.sessionStorage.clear();
          expect(win.localStorage.length).to.eq(0);
          expect(win.sessionStorage.length).to.eq(0);
        });
      });

      it("error displayed on entering invalid username/password", () => {
        loginDetails.invalidUserNames.forEach((username) => {
          loginPage.login(username, loginDetails.validPassword);
          loginPage.error().to.be.true;
          loginPage.getErrorMessage().should("contain",
            "Epic sadface: Username and password do not match any user in this service"
          );
        });
      });
    });
});