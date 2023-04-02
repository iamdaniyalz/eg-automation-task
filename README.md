# Easy Generator Test Automation Assignment


### Steps to perform in order to run the app and execute the test script.

1. Clone the repo to your machine.
2. Open Terminal
...
    npm install
    npm start
    > This will run the app on http://localhost:1025
...

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

### Results
![image](https://user-images.githubusercontent.com/52025650/229377012-fde9f4af-9705-45d1-8872-6dd6f8965ec0.png)
