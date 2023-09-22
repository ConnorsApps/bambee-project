/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Ensure everything is visable', () => {
    cy.get('#new-task-button').should('be.visible').should('be.enabled');

    cy.get('#tasks-header').should('be.visible');

    cy.get('#backlog-list').should('be.visible').contains('Backlog');

    cy.get('#in-progress-list').should('be.visible').contains('In Progress');

    cy.get('#complete-list').should('be.visible').contains('Complete');
  });

  it('Create New Task',()=>{
    cy.get('#new-task-button').click();

    cy.get('#submit-button').should('be.disabled');

    const name = 'My Fake Task';
    const description = 'Some description 1234';

    cy.get('#name-field').type(name);
    cy.get('#description').type(description);
    
    cy.get('#submit-button').should('be.enabled').click();

    //Ensure it appears in backlog
    cy.get('#backlog-list [data-cy-task-name]').contains(name);
  });
});
