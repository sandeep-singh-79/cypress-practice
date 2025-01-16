class LoginPage {
  visit() {
    cy.visit("/");
  }
  elements = {
    userNameInput: "#user-name",
    passwordInput: "#password",
    loginButton: "#login-button",
    errorMessage: '[data-test="error"]',
  };

  login(username, password) {
      console.log("username: " + username + "; password: " + password);
    var userName = cy.get(this.elements.userNameInput);
    userName.clear().type(username);
    cy.get(this.elements.passwordInput).type(password);
    cy.get(this.elements.loginButton).click();
  }

  getErrorMessage() {
    return cy.get(this.elements.errorMessage).text();
  }

  error() {
    return cy.get(this.elements.errorMessage).should("be.visible");
  }
};

export const loginPage = new LoginPage();