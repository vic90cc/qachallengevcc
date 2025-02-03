# API Testing Project

This project includes test automation for an Employee Benefits API using multiple testing tools.

## Project Structure

```
api-testing-projects/
├── cypress-tests/         # Cypress automated UI and some validation API  tests
├── postman-tests/         # Postman Collection and Environment
└── k6-tests/             # k6 Performance tests
```

## Tools Used

- **Cypress**: UI testing
- **Postman**: API testing and collection documentation
- **k6**: Performance testing

## Setup and Installation

### Prerequisites
- Node.js installed
- Postman installed
- homebrew installed
- k6 installed
  

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/vic90cc/qachallengevcc.git
cd api-testing-projects
```

2. Install Cypress:
```bash
cd cypress-tests
npm install
```

3. Import Postman Collection:
- Open Postman
- Import `Employee-API.postman_collection.json`
- Import `Employee-API.postman_environment.json`
- Update environment variables

4. Install k6:
```bash
# macOS
brew install k6

# Windows
choco install k6

# Linux
sudo apt-get install k6
```

## Running Tests

### Cypress Tests
```bash
cd cypress-tests
npx cypress open    # Open Cypress Test Runner
npx cypress run     # Run tests in headless mode
```

### Postman Tests
1. Open Postman
2. Select imported collection "employees.postman_collection.json
3. Click "Run Collection"
4. View results in the "Test Results" tab

### k6 Performance Tests
```bash
cd k6-tests
k6 run /prueba-rendimiento-10vu60s.js
```

## Test Cases

The project includes tests for:
- GET /employees (list employees)
- GET /employees (single employee)
- POST /employees (create employee)
- PUT /employees (update employee)
- DELETE /employees (delete employee)

Each endpoint is tested for:
- Status codes
- Response structure
- Data validation
- Business logic (benefit calculations)
- Error scenarios

Some escenarios about validation are not included in postman tests, but are included inside the validations of Cypress tests.

## Environment Variables

Required environment variables:
- `baseUrl`: https://wmxrwq14uc.execute-api.us-east-
- `token`: Basic VGVzdFVzZXI3MTk6bXZjWUYnaCU1Py13

## Reports

- Cypress generates reports in `cypress/reports` once the runner has been executed.
- k6 results are shown in the screenshot attached in the same project
- Postman collection runner provides test results summary
- A report created in Google sheets could be consulted in https://docs.google.com/spreadsheets/d/18VH1ezpwQcbcONkoHLu1WsTZnDcEmRo5F0g1TdP9TG0/edit?gid=0#gid=0, it has the details of test cases executed manually, for every test case failed the column F cotains "Test result"
- A trello dashboard has been created with defects reported and the corresponding evidence inside every report. It could be viewed in https://trello.com/b/nbYOHh0F/bugs-qachallenge 

## Author

Victor Cortes C
