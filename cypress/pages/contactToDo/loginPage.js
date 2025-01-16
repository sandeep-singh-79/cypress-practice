class ContactToDoLoginPage {
    elements = {
        emailInput: 'input[id="email"]',
        passwordInput: 'input[id="password"]',
        loginButton: 'button[id="submit"]',
        errorMessage: 'span[id="error"]',
        signupLink: 'button[id="signup"]',
    };

    login(email, password) {
        cy.get(this.elements.emailInput).type(email);
        cy.get(this.elements.passwordInput).type(password);
        cy.get(this.elements.loginButton).click();
    }

    getErrorMessage() {
        return cy.get(this.elements.errorMessage).text();
    }
};

export const todoLoginPage = new ContactToDoLoginPage();