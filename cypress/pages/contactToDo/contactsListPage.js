class ContactListPage {
    elements = {
        addAContact: () => cy.get('#add-contact'),
        logout: () => cy.get('#logout'),
        contactsTable: () => cy.get('.contactTable'),
    };

    isEmptyOnFirstLogin() {
        return this.elements
          .contactsTable()
          .parent().find('.contactTable')
          .find(".contactTable-Body")
          .should("be.empty");
    }

    logout() {
        this.elements.logout().click();
    }

};

export const contactListPage = new ContactListPage();