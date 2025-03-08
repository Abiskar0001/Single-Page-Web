describe('Student Management E2E Test', () => {
    it('should add a new student', () => {
      cy.visit('http://localhost:3000');
      
      cy.get('#addStudentButton').click();
      cy.get('#studentNameInput').type('Alice');
      cy.get('#submitStudentButton').click();
  
      cy.contains('Alice');
    });
  });
  