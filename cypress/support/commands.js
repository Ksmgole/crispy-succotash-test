Cypress.Commands.add('login',(username, password)=>{
    cy.visit('/accounts/login/')
    cy.get('#id_username').type(username)
    cy.get('#id_password').type(password + '{enter}')
})

Cypress.Commands.add('addFeed',(url)=>{
    cy.get('a[href="/feeds/new/"]').click()
    cy.get('#id_feed_url').type(url)
    cy.get('#submit-id-submit').click()
})

Cypress.Commands.add('bookmarkFeed',(title)=>{
    cy.get('a[href="/feeds/"]').click()
    cy.contains(title).click()
    cy.get('.glyphicon-heart-empty').click()
})

Cypress.Commands.add('unbookmarkFeed',(title)=>{
    cy.get('a[href="/feeds/bookmarked/"]').click()
    cy.contains(title).click()
    cy.get('.glyphicon-heart').click()
})

Cypress.Commands.add('submitComment',(comment)=>{
    cy.get('.CodeMirror-lines').type(comment)
    cy.get('#submit-id-submit').click()
})