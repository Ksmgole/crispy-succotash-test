import user from "../../fixtures/user.json"

const registeredUsername = user.registered.user2.username,
    registeredPassword = user.registered.user2.password;

describe('User Login',()=>{

    before(function(){
        cy.visit('/accounts/login/')
    })

    it('should be unable to log in with blank fields',()=>{
        cy.get('input[value="login"]').click()
        cy.get('#error_1_id_username').should('contain','This field is required.')
        cy.get('#error_1_id_password').should('contain','This field is required.')
    })

    it('should be unable to login with wrong credentials',()=>{
        cy.login(registeredUsername,"kukuku")
        cy.get('.alert').should('contain','Please enter a correct username and password. Note that both fields may be case-sensitive.')
    })

    it('should login successfully with registered credentials',()=>{
        cy.login(registeredUsername,registeredPassword)
        cy.url().should('include','/feeds')
    })

})
