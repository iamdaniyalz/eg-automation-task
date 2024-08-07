# Easy Generator Test Automation Assignment [![ci](https://github.com/iamdaniyalz/eg-automation-task/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/iamdaniyalz/eg-automation-task/actions/workflows/ci.yml)


### Steps to perform in order to run the app and execute the test script.

1. Clone the repo to your machine.
2. Open Terminal

    npm install
    
    npm start
    > This will run the app on http://localhost:1025


**Run Cypress in UI mode**

    npm run cypress:ui

**Run Cypress in headless mode**

    npm run cypress:headless

### Important Points

1. No 3rd party dependency is used
2. TypeScript is used for writing test scripts
3. Prettier is used as code formatter. It can be run by doing
    prettier:check
    prettier:apply
4. POM (Page object model) is used as design pattern
5. Injected data-test-id in the task.html to create a better selector for topbar/header

    [data-test-id='eg-practice-page-topbar']
6. Setup a CI pipeline with GitHub Actions
[![ci](https://github.com/iamdaniyalz/eg-automation-task/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/iamdaniyalz/eg-automation-task/actions/workflows/ci.yml)

### Results
<img width="642" alt="image" src="https://github.com/iamdaniyalz/eg-automation-task/assets/52025650/c3e4b27a-a0ed-4ad0-9bf0-d163e12ba51c">

