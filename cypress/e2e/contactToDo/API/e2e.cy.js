import {faker} from '@faker-js/faker';

function fetchContactList (authToken) {
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        url: 'https://thinking-tester-contact-list.herokuapp.com/contacts',
        method: 'GET',
    };
    
    return cy.request(requestOptions).then(res => {
        return res;
    });
};

async function fetchContact(authToken, contactId) {
    let requestOptions = {
        url: `https://thinking-tester-contact-list.herokuapp.com/contacts/${contactId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };

    return cy.request(requestOptions).then((res) => {
      if (res.status === 401) {
        // Token refresh logic
        return cy.refreshToken().then((newToken) => {
          requestOptions.headers.Authorization = `Bearer ${newToken}`;
          return cy.request(requestOptions); // Reattempt the request with new token
        });
      } else {
        return res; // Return the successful response
      }
    });
};

describe(['E2E_API', 'API'], 'End to End Contact To Do test cases', () => {
    let contactId = '';

    beforeEach(() => {
        const authToken = cy.refreshToken();
        cy.log(`Auth token: ${authToken}`);
        /* cy.session('login', () => {
            cy.refreshToken().then((newToken) => {
                window.sessionStorage.setItem('token', newToken);
            }
        }) */
    });

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

    const contactRequestOptions = (authToken) => {
      return {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
        method: "POST",
        body: contact,
        failOnStatusCode: false,
      };
    };
    
    // get the auth token from the session storage for the add contact request
    it('Add Contact', () => {
        const authToken = Cypress.env('token');
        cy.log(`Auth token: ${authToken}`);

        cy.request(contactRequestOptions(authToken))
        .then((response) => {
            // Validate the response of the contact creation
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('_id').and.not.be.undefined;

            contactId = response.body._id; // Extract the contact ID
            return fetchContact(authToken, contactId); // Call fetchContact and return its result
        }).then((res) => {
            // Validate the fetched contact details
            cy.log(`Response Body: ${JSON.stringify(res.body)}`); // Log the response body
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('_id').and.equal(contactId);
            expect(res.body).to.have.property('firstName').and.equal(contact.firstName);
            expect(res.body).to.have.property('lastName').and.equal(contact.lastName);
        });
    });

    it('Fetch Contact List', () => {
        const authToken = Cypress.env('token');
        if (!authToken) {
            throw new Error('Auth token not found!');
        }

        fetchContactList(authToken).then((res) => {
            expect (res.status).to.equal(200);
            cy.log(`total number of contacts fetched: ${res.body.length}`);
            expect(res.body.length).to.be.gt(0);
            
            const addedContact = res.body.find((c) => c._id .localeCompare(contactId) === 0);
            cy.log(`Added contact: ${JSON.stringify(addedContact)}`);
            expect(addedContact._id).to.not.be.undefined;
            expect(addedContact).to.have.property('firstName'); expect(addedContact.firstName).to.equal(contact.firstName);
            expect(addedContact).to.have.property('lastName'); expect(addedContact.lastName).to.equal(contact.lastName);
        });
    });
});