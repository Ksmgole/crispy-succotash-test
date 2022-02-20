import user from "../../fixtures/user.json"

const validUsername = user.registered.user1.username,
      validPassword = user.registered.user1.password,
      invalidUsername = user.invalid.username.special_char,
      invalidPassword = user.invalid.password,
      usernameCharLimit = user.invalid.username.long_char;


describe('User Sign Up',()=>{

    beforeEach(function(){
        cy.visit('/accounts/register/')
    })

    it('should be able to sign up with valid credentials',()=>{
        cy.get('#id_username').type(validUsername + Math.floor(Math.random() * 1000)+'{enter}')
        cy.get('#id_password1').type(validPassword)
        cy.get('#id_password2').type(validPassword + '{enter}')
        cy.url().should('contain','/feeds')
        cy.get('.alert-success').contains('`Great success! Enjoy :)`')
    })

    it('should be unable to sign up with blank fields',()=>{
        cy.get('#submit-id-submit').click()
        cy.get('#error_1_id_username').should('contain','This field is required.')
        cy.get('#error_1_id_password1').should('contain','This field is required.')
        cy.get('#error_1_id_password2').should('contain', 'This field is required.')
    })

    it('should be unable to sign up with the username that already exists ',()=>{
        cy.get('#id_username').type(validUsername +'{enter}')
        cy.get('#error_1_id_username').should('contain','A user with that username already exists.')    
    })

    it('should include only special characters @,.,+,-,_ in the username',()=>{
        for(let i=0;i<invalidUsername.length;i++){
            cy.get('#id_username').type(invalidUsername[i] +'{enter}')
            cy.get('#error_1_id_username').should('contain', 'Enter a valid username. This value may contain only letters, numbers and @/./+/-/_ characters.')  
        }   
    })

    it('should have username 30 or fewer',()=>{
        cy.get('#id_username').type(usernameCharLimit +'{enter}')
        cy.get('#error_1_id_username').should('contain','Enter username 30 or fewer')    
    })

    it('should be at least 8 characters password ',()=>{
        cy.get('#id_password1').type(invalidPassword)
        cy.get('#id_password2').type(invalidPassword +'{enter}')
        cy.get('#error_1_id_password2').should('contain','This password is too short. It must contain at least 8 characters.')
    })

    it('should have password different from the username',()=>{
        cy.get('#id_username').type(validUsername+ Math.floor(Math.random() * 1000))
        cy.get('#id_password1').type(validUsername)
        cy.get('#id_password2').type(validUsername +'{enter}')
        cy.get('#error_1_id_password2').should('contain','The password is too similar to the username.')
    })

    it('should have two passwords same',()=>{
        cy.get('#id_password1').type(validPassword)
        cy.get('#id_password2').type(invalidPassword +'{enter}')
        cy.get('#error_1_id_password2').should('contain', 'The two password fields didn\'t match.')
    })

})