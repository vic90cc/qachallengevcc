# API Testing Project

This project includes test automation for an Employee Benefits API using multiple testing tools and approaches.

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
2. Select imported collection
3. Click "Run Collection"
4. View results in the "Test Results" tab

### k6 Performance Tests
```bash
cd k6-tests
k6 run test-complete.js
```

## Test Cases

The project includes tests for:
- GET /employees (list and single employee)
- POST /employees (create employee)
- PUT /employees (update employee)
- DELETE /employees (delete employee)

Each endpoint is tested for:
- Status codes
- Response structure
- Data validation
- Business logic (benefit calculations)
- Error scenarios

## Environment Variables

Required environment variables:
- `baseUrl`: API base URL
- `token`: Authentication token

## Reports

- Cypress generates reports in `cypress/reports`
- k6 results can be exported using `--out json=results.json`
- Postman collection runner provides test results summary

## Author

[Your Name]

## License

This project is licensed under the MIT License
