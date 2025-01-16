class SignUpPage {
    visit() {
        cy.visit("/signup");
    }

    elements = {
        signUpButton: 'button[type="submit"]',
        emailInput: 'input[id="email"]',
        passwordInput: 'input[id="password"]',
        firstNameInput: 'input[id="firstName"]',
        lastNameInput: 'input[id="lastName"]',
        errorMessage: 'span[id="error"]',
        cancelButton: 'button[id="cancel"]'
    };

    signUp(firstName, lastName, email, password) {
        cy.get(this.elements.firstNameInput).type(firstName);
        cy.get(this.elements.lastNameInput).type(lastName);
        cy.get(this.elements.emailInput).type(email);
        cy.get(this.elements.passwordInput).type(password);
        cy.get(this.elements.signUpButton).click();        
    }

    getErrorMessage() {
        cy.get(this.elements.errorMessage).should('be.visible');
        return cy.get(this.elements.errorMessage).invoke('text');
    }
}

export const signUpPage = new SignUpPage();