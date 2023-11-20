# Node Webapp Template

## Overview

The following repo allows us to quickly bootstrap Node projects, using this allows us to ensure consistency across our Node repositories. It can be a starting point for the creation of RESTfull API ​or for the creation of web application with GDS GovUK frontend best practice.

In the context of a web application, each page or user interface, defined by an endpoint, is devided into three components (MVC) and as a best practice the names for the model, view and controller have, when possible, the same start name of the endpoints (es. for the `/info` page we have the: `info.controller.ts` and `info.html` files if model present we will have had `info.model.ts`)

### The Model

In the model we define the interface, the data structure used to represent the data for that particular page and an array used to map back and forth information between the data saved and the `nunjucks` html view data.

### The View

We use `Nunjucks` and `GDS` style/components, we could use the prototype if an UX team is present in loco.

### The controller

Generally only POST and GET http methods are allowed, and therefore we will have mainly just the get and post controllers, and it is literally the last successful middleware of the chain that has the duty to respond to the user.
In the `get` method we fetch possible data and pass it to the view/template to be visualized to the user and in the `post` method we save the user data everytime that a page is submitted

## Files Structure

Directory Path | Description
--- | ---
`./.github` | Github folder, includes `PULL_REQUEST_TEMPLATE.md` on how to make a pull request to the project and `dependabot.yml` configuration options for dependency updates.
`./.husky` | Add pre check script, includes `pre-commit` and `pre-push` checks
`./src` | Contains all typescripts code
`./src/app.ts` | Application entry point
`./src/bin/www.ts` | Server configuration
`./src/config/index.ts` | Contains all the application's configurations
`./src/controller` | Business logic and handlers
`./src/middleware` | Middleware functions (Authentication, validation ...)
`./src/model` | OE Session and View Data Model
`./src/routes` | Paths and routes controller (Only GET and POST enabled)
`./src/service` | Interface to the API through SDK
`./src/utils` | Facade for CH services (logging and session) and other application utils (navigation, application data ...)
`./src/validation` | Sets of express validator middlewares for each page
`./test` | Jest Test files (`*.spec.ts`, `setup.ts`, and `*.mocks.ts`)
`./view` | Contains all the html nunjucks structure files
`./docs` | Contains documentation files
Others files | Other files related to modules dependency, CI/CD, *git, dockerization, lint, test/typescript configs …

## ESlint and Prettier

We use ESlint as both a formatter and code quality assurance, while using Prettier to apply formatting on save. To setup format on save, do the following

1. Install the [Prettier VScode extenstion](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
2. Open your user settings inside VScode and search for: format
3. Select your Default Formatter as: `Prettier - Code formatter`.
4. Click the checkbox under: `Format on Save`.
5. Reload VScode.

## ToDo

- Add API service module
- Add logging service
- Add Validation and Navigation MW
- Add Authentication MW and Session handler logic
- Update CDN origin
- Publishes the SDK on npm package registry
