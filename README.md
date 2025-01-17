# Cypress Practice Repository

This repository was created to practice Cypress, a JavaScript end-to-end testing framework.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Running with tags](#running-tests-with-tags)
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

### Running Tests with Tags
This repository uses the ```cypress-tags``` plugin to filter and run tests based on tags. You can use the following commands to run tests with specific tags from the CLI:

To run tests with a specific tag, use the ```--env grep``` option:
```sh
npx cypress run --env grep=<tag>
```

Example:
```sh
npx cypress run --env grep=@smoke
```
To run tests with multiple tags, use the ```--env grep``` option with a comma-separated list of tags:
```sh
npx cypress run --env grep=<tag1>,<tag2>
```
Example:
```sh
npx cypress run --env grep=@smoke,@regression
```
To run tests that do not have a specific tag, use the ```--env grepTags``` option with a ```-``` prefix:
```sh
npx cypress run --env grepTags=-<tag>
```
Example:
```sh
npx cypress run --env grepTags=-@wip
```
To run tests with a combination of tags, you can use both ```--env grep``` and ```--env grepTags``` options:
```sh
npx cypress run --env grep=<tag1> --env grepTags=-<tag2>
```
Example:
```
npx cypress run --env grep=@smoke --env grepTags=-@wip
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
