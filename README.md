# Node Web-app Template
![Static Badge](https://img.shields.io/badge/test_coverage-%E2%89%A595%25-green)

## Overview

The following repo allows us to quickly bootstrap Node projects, using this allows us to ensure consistency across our Node repositories. It can be a starting point for the creation of RESTful API ​or for the creation of web application with [GOV.UK Design System](https://design-system.service.gov.uk/) best practice.

In the context of a web application, each page or user interface, defined by an endpoint, is divided into three components (MVC) and as a best practice the names for the model, view and controller have, when possible, the same start name of the endpoints (e.g. for the `/info` page we have the: `info.controller.ts` and `info.html` files. If models were present, we would have `info.model.ts`)

### The Model

In the model we define the interface, the data structure used to represent the data for that particular page and an array used to map back and forth information between the data saved and the `nunjucks` html view data.

### The View

We use `Nunjucks` and `GDS` style/components, we could use the prototype if an UX team is present in loco.

### The Controller

Generally only POST and GET http methods are allowed, and therefore we will have mainly just the get and post controllers, and it is literally the last successful middleware of the chain that has the duty to respond to the user.
In the `get` method we fetch possible data and pass it to the view/template to be visualized to the user and in the `post` method we save the user data everytime that a page is submitted

## Files Structure

Directory Path | Description
--- | ---
`./.github` | Github folder, includes `PULL_REQUEST_TEMPLATE.md` on how to make a pull request to the project and `dependabot.yml` configuration options for dependency updates.
`./.husky` | Add pre check script, includes `pre-commit` and `pre-push` checks
`./src` | Contains all TypeScript code
`./src/app.ts` | Application entry point
`./src/bin/www.ts` | Server configuration
`./src/config/index.ts` | Contains all the application's configurations
`./src/controller` | Business logic and handlers
`./src/middleware` | Middleware functions (Authentication, validation ...)
`./src/model` | OE Session and View Data Model
`./src/routes` | Paths and routes controller (Only GET and POST enabled)
`./src/service` | Interface to the API through SDK
`./src/utils` | Facade for CO services (e.g. logging) and other application utils (navigation, application data ...)
`./src/validation` | Sets of express validator middlewares for each page
`./test` | Jest Test files (`*.spec.ts`, `setup.ts`, and `*.mocks.ts`)
`./view` | Contains all the html nunjucks structure files
`./docs` | Contains documentation files
Others files | Other files related to modules dependency, CI/CD, *git, dockerization, lint, test/typescript configs …

## ESlint

We use ESlint as both a formatter and code quality assurance. Eslint can also be setup to format on save using a VScode extension:

1. Install the [ESlint VScode extenstion](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
2. Open your user settings (JSON) inside VScode and add the following:
```
    "editor.formatOnSave": true, 
    "editor.codeActionsOnSave": { "source.fixAll.eslint": true }
```
3. Reload VScode.

## Running local development environment with Docker

Docker is used run the application in development mode, with tooling setup to detect changes in local `src` directory and reload the container's node server.

Follow the steps in [Launching-the-web-app](#Launching-the-web-app), and ensure that `NODE_ENV=development` is set in the `.env` file.

## Launching the web-app

### Prerequisites

1. Install [NodeJS V20.8](https://nodejs.org/en)

2. Install [Docker](https://www.docker.com/get-started)

### Building the Docker Image

1. Create a copy of the `.env.example` file and name it `.env`:

 Then run:

    make docker-build

    make docker-up

This will then download the necessary dependencies, build the Docker image, and start the application.
You will be able to access it on [localhost:3000](localhost:3000).

## ToDo

- Add API service module
- Add Validation and Navigation MW
- Add Authentication MW and Session handler logic
- Update CDN origin
