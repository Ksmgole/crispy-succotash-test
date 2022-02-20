import user from "../../fixtures/user.json"
import feed from "../../fixtures/feeds.json"

const username1 = user.registered.user1.username,
    password1 = user.registered.user1.password,
    username2 = user.registered.user2.username,
    password2 = user.registered.user2.password,
    feedTitle = feed.title;

describe('Comment Feed',()=>{

    it('should be able to comment in own feed item',()=>{
        cy.login(username1,password1)
        cy.get('a[href="/feeds/"]').click()
        cy.contains(feedTitle).click()
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.submitComment('This is a comment in my own feed')
        cy.get('p').and('contain', 'This is a comment in my own feed').should('be.visible')
        cy.get(':nth-child(1) > .col-sm-1').contains(username1)
    })

    it('should be able to comment in the feed item added by other user',()=>{
        cy.login(username2,password2)
        cy.get('a[href="/feeds/"]').click()
        cy.contains(feedTitle).click()
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.submitComment('This is a comment in my feed by other user')
        cy.get('p').and('contain','This is a comment in my feed by other user').should('be.visible')
        cy.get(':nth-child(1) > .col-sm-1').contains(username2)
    })
   
})