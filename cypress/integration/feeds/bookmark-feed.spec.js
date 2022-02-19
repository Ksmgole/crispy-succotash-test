import user from "../../fixtures/user.json"
import feeds from "../../fixtures/feeds.json"

const username1 = user.registered.user1.username,
      password1 = user.registered.user1.password,
      username2 = user.registered.user2.username,
      password2 = user.registered.user2.password,
      feedTitle = feeds.title;


describe('Bookmark Feed',()=>{

    beforeEach(function(){
        Cypress.Cookies.preserveOnce('sessionid','csrftoken')
    })
    
    it('should display the bookmarked feed in the bookmark list',()=>{
        cy.login(username1,password1)
        cy.bookmarkFeed(feedTitle)
        cy.get('.glyphicon-heart').should('be.visible')
        cy.get('a[href="/feeds/bookmarked/"]').click()
        cy.contains(feedTitle).should('be.visible')
    })

    it('should not display the unbookmarked feed in the bookmark list',()=>{
        cy.login(username1,password1)
        cy.unbookmarkFeed(feedTitle)
        cy.get('.glyphicon-heart-empty').should('be.visible')    
        cy.get('a[href="/feeds/bookmarked/"]').click()
        cy.contains(feedTitle).should('not.exist')
    })

    it('should display a message if there are no bookmarked feed',()=>{
        cy.get('a[href="/feeds/bookmarked/"]').click()
        cy.contains('Nothing to see here. Move on!').should('be.visible')
    })

    it('should able to bookmark the feed added by the other user',()=>{
        cy.login(username2,password2)
        cy.bookmarkFeed(feedTitle)
        cy.get('.glyphicon-heart').should('be.visible')
        cy.get('a[href="/feeds/bookmarked/"]').click()
        cy.contains(feedTitle).should('be.visible')
    })

})