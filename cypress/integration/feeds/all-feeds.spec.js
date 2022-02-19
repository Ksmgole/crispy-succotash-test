import user from "../../fixtures/user.json"
import feeds from "../../fixtures/feeds.json"

const username = user.registered.user1.username,
      password = user.registered.user1.password,
      validUrl = feeds.url.valid,
      feedTitle = feeds.title;

describe('All Feeds',()=>{

    beforeEach(function(){
        Cypress.Cookies.preserveOnce('sessionid','csrftoken')
    })

    before(function(){
        cy.login(username,password)
        cy.get('a[href="/feeds/"]').click()

    })
  
    it('should appear pagination only if there are more than 10 feeds',()=>{
        for (let i=1; i < validUrl.length; i++){
            cy.addFeed(validUrl[i])
            cy.get('a[href="/feeds/"]').click()
            if(i<10){
                cy.get('.pagination').should('not.exist')
            }else{
                cy.get('.pagination').should('be.visible')   
            }
        }
    })

    it('should load the next and prev feed list on clicking pagination links',()=>{
        cy.get('a[href="/feeds/?page=2"]').click()
        cy.url().should('include','/feeds/?page=2')
        cy.get('a[href="/feeds/?page=1"]').click()
        cy.url().should('include','/feeds/?page=1')
    })

    it('should visit the feed items listing page on clicking feed title',()=>{
        cy.contains(feedTitle).click()
        cy.get('h1').should('contain',feedTitle)
    })

})