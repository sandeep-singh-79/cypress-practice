# Cypress Practice Repository

This repository was created to practice Cypress, a JavaScript end-to-end testing framework.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contribution](#contribution)
- [License](#license)

## Installation

To install the dependencies, run:

```sh
npm install
```

## Usage
To open the Cypress Test Runner, run:
```sh
npm run cypress:open
```

To run the tests in headless mode, run:
```sh
npm run cypress:run
```

## Project Structure
```
.github/
    workflows/
        build.yml
.gitignore
cypress/
    e2e/
        1-getting-started/
            todo.cy.js
        2-advanced-examples/
            actions.cy.js
            aliasing.cy.js
            assertions.cy.js
            connectors.cy.js
            cookies.cy.js
            cypress_api.cy.js
            ...
        contactToDo/
            ...
        practice/
        sauceDemo/
    fixtures/
        contactsToDo/
        example.json
        sauceDemo/
    pages/
        contactToDo/
        sauceDemo/
    reports/
        html/
    screenshots/
        e2e.cy.js/
    support/
        commands.js
        e2e.js
cypress.config.js
jsconfig.json
package.json
README.md
```

## Contribution
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
