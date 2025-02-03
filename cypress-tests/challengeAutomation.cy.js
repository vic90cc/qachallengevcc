// cypress/support/commands.ts  

describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn")
    cy.get("[id='Username']").type("TestUser719")
    cy.get("[id='Password']").type("mvcYF'h%5?-w")
    cy.get("[class='btn btn-primary']").click()
  })


context("Add User", () => {
it.skip("Not Allows user to login with incorrect credentials", () => {
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='add']").should("exist")
  cy.get("[id='Username']").type("TestUser719")
  cy.get("[id='Password']").type("mvcYF'h%5?-")
  cy.get("[class='btn btn-primary']").click()
  cy.get(".text-danger").should("exist")

})

it('Add a user with 0 dependant and validate salary calculations when creating a new employee', () => {
  cy.get("[id='add']").should("exist").click()
  
  cy.intercept('POST', '**/api/employees').as('createEmployee')
  cy.get("[id='firstName']").type("Vic")
  cy.get("[id='lastName']").type("123456789Editadi")
  cy.get("[id='dependants']").type("0")
  cy.get("[id='addEmployee']").click()  
  
  cy.wait('@createEmployee').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
    
    const response = interception.response.body
    const dependants = response.dependants
    expect(response.salary).to.equal(52000)
    expect(response.gross).to.equal(2000)

    const annualBenefitsCost = 1000 + (500 * dependants)
    const expectedBenefitsCost = annualBenefitsCost / 26
    expect(response.benefitsCost).to.be.closeTo(expectedBenefitsCost, 0.01)

    const expectedNet = 2000 - expectedBenefitsCost
    expect(response.net).to.be.closeTo(expectedNet, 0.01)
  })
})

it('Add a user with 1 dependant and validate salary calculations when creating a new employee', () => {
  cy.get("[id='add']").should("exist").click()
  
  cy.intercept('POST', '**/api/employees').as('createEmployee')
  cy.get("[id='firstName']").type("Vic")
  cy.get("[id='lastName']").type("123456789Editadi")
  cy.get("[id='dependants']").type("1")
  cy.get("[id='addEmployee']").click()  
  
  cy.wait('@createEmployee').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
    
    const response = interception.response.body
    const dependants = response.dependants
    expect(response.salary).to.equal(52000)
    expect(response.gross).to.equal(2000)

    const annualBenefitsCost = 1000 + (500 * dependants)
    const expectedBenefitsCost = annualBenefitsCost / 26
    expect(response.benefitsCost).to.be.closeTo(expectedBenefitsCost, 0.01)

    const expectedNet = 2000 - expectedBenefitsCost
    expect(response.net).to.be.closeTo(expectedNet, 0.01)
  })
})

it("Add a user with string dependant", () => {
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']").type("a")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').then((interception) => {
   expect(interception.response.statusCode).to.equal(405)
 })
})

it("Add a user with -1 dependant", () => {
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']").type("-1")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').then((interception) => {
   expect(interception.response.statusCode).to.equal(400)
 })
})

it("Add a user with 33 or more dependants", () => {  
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']").type("33")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').then((interception) => {
   expect(interception.response.statusCode).to.equal(400)
})
})

it("Add a user with 15.something or more dependants", () => { 
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']").type("15.25")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').then((interception) => {
   expect(interception.response.statusCode).to.equal(400)
})
})

it("Add a user with special characters in name and last name", () => { 
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor$")
  cy.get("[id='lastName']").type("Cortes$")
  cy.get("[id='dependants']").type("15")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').then((interception) => {
   expect(interception.response.statusCode).to.equal(400)
})
})

it("An Error is shown when the first name is blank", () => {  
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']").type("15")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').should(({ response }) => {
    expect(response.statusCode).to.equal(400)
    expect(response.body[0].errorMessage).to.equal('The FirstName field is required.')
})
})

it("An Error is shown when the last name is blank", () => { 
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor")
  cy.get("[id='lastName']")
  cy.get("[id='dependants']").type("15")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').should(({ response }) => {
    expect(response.statusCode).to.equal(400)
    expect(response.body[0].errorMessage).to.equal('The LastName field is required.')
})
})

it("An Error is shown when the dependants is blank", () => { 
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Victor")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').then((interception) => {
    expect(interception.response.statusCode).to.equal(405)
})
})

it("Error is shown when the the first name has more than 50 characters", () => {
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("123456789012345678901234567890123456789012345678901")
  cy.get("[id='lastName']").type("Cortes")
  cy.get("[id='dependants']").type("1")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').should(({ response }) => {
    expect(response.statusCode).to.equal(400)
    expect(response.body[0].errorMessage).to.equal('The field FirstName must be a string with a maximum length of 50.')
})
})

it("Error is shown when the the last name is more than 50 characters", () => {
  cy.get("[id='add']").should("exist").click()
  cy.get("[id='firstName']").type("Vic")
  cy.get("[id='lastName']").type("12345678901234567890123456789012345678901234545455678901")
  cy.get("[id='dependants']").type("1")
  cy.intercept('POST', '**/api/employees').as('employeesRequest')
  cy.get("[id='addEmployee']").click()  
  cy.wait('@employeesRequest').should(({ response }) => {
    expect(response.statusCode).to.equal(400)
    expect(response.body[0].errorMessage).to.equal('The field LastName must be a string with a maximum length of 50.')
})
})

})


context("Edit User", () => {
  it.only("User is able to edit 1 employe with new 0 dependants", () => {
    cy.get(':nth-child(1) > :nth-child(9) > .fa-edit').click()
    cy.intercept('PUT', '**/api/employees').as('createEmployee')
    cy.get("[id='firstName']").clear().type("Victor")
    cy.get("[id='lastName']").clear().type("Cortes")
    cy.get("[id='dependants']").clear().type("0")
    cy.get("[id='updateEmployee']").click()
  
   cy.wait('@createEmployee').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
    const response = interception.response.body
    const dependants = response.dependants
    const requestBody = interception.request.body;
    const responseBody = interception.response.body;
            
    expect(responseBody.id).to.equal(requestBody.id);
    expect(responseBody.sortKey).to.equal(requestBody.id)

    expect(response.salary).to.equal(52000)
    expect(response.gross).to.equal(2000)
    const annualBenefitsCost = 1000 + (500 * dependants)
    const expectedBenefitsCost = annualBenefitsCost / 26
    expect(response.benefitsCost).to.be.closeTo(expectedBenefitsCost, 0.01)
    const expectedNet = 2000 - expectedBenefitsCost
    expect(response.net).to.be.closeTo(expectedNet, 0.01)
    
  })
  })

  it("User is able to edit 1 employe with new 1 dependants", () => {
    cy.get(':nth-child(2) > :nth-child(9) > .fa-edit').click()
    cy.intercept('PUT', '**/api/employees').as('createEmployee')
    cy.get("[id='firstName']").clear().type("Victor")
    cy.get("[id='lastName']").clear().type("Cortes")
    cy.get("[id='dependants']").clear().type("1")
    cy.get("[id='updateEmployee']").click()
    
    cy.wait('@createEmployee').then((interception) => {
    expect(interception.response.statusCode).to.equal(200)
    const response = interception.response.body
    const dependants = response.dependants
    expect(response.salary).to.equal(52000)
    expect(response.gross).to.equal(2000)
    const annualBenefitsCost = 1000 + (500 * dependants)
    const expectedBenefitsCost = annualBenefitsCost / 26
    expect(response.benefitsCost).to.be.closeTo(expectedBenefitsCost, 0.01)
    const expectedNet = 2000 - expectedBenefitsCost
    expect(response.net).to.be.closeTo(expectedNet, 0.01)
    
  })
  })

  it("User edits 1 employe with new string dependants and is not saved.", () => {
    cy.get(':nth-child(2) > :nth-child(9) > .fa-edit').click()
    cy.intercept('PUT', '**/api/employees').as('createEmployee')
    cy.get("[id='firstName']").clear().type("Victor")
    cy.get("[id='lastName']").clear().type("Cortes")
    cy.get("[id='dependants']").clear().type("hola")
    cy.get("[id='updateEmployee']").click()
  
  cy.wait('@createEmployee').then((interception) => {
    const response = interception.response.body
    const dependants = response.dependants
    
    expect(interception.response.statusCode).to.equal(405)
   
    
  })
  })

  it("User edits 1 employe without first name and is not saved.", () => {
    cy.get(':nth-child(2) > :nth-child(9) > .fa-edit').click()
    cy.intercept('PUT', '**/api/employees').as('editEmployee')
    cy.get("[id='firstName']").clear()
    cy.get("[id='lastName']").clear().type("Cortes")
    cy.get("[id='dependants']").clear().type("4")
    cy.get("[id='updateEmployee']").click()
  
  cy.wait('@editEmployee').then((interception) => {
    const response = interception.response.body
    const dependants = response.dependants

    expect(interception.response.statusCode).to.equal(400)
    expect(interception.response.body[0].errorMessage).to.equal('The FirstName field is required.')
  })
  })

  })

  context("Delete User", () => {
    it("User is able to delete a employee", () => {
      cy.intercept('DELETE', '**/api/employees/*').as('deleteEmployee')
      cy.get(':nth-child(1) > :nth-child(9) > .fa-times').click()
 
      cy.get("[id='deleteEmployee']").click()
      cy.wait('@deleteEmployee').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
      const url = interception.request.url
      const deletedId = url.split('/').pop()

      cy.contains(deletedId).should('not.exist')
    })
    })

    it("User cancells delete action of an employee", () => {
      cy.get(':nth-child(1) > :nth-child(9) > .fa-times').click()
      cy.get('#deleteModal > div > div > div.modal-footer > button.btn.btn-secondary').click()
      cy.get(':nth-child(1)').should('exist')
    })
  
 })

})
