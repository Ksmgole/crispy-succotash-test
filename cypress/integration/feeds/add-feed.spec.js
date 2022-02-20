import user from "../../fixtures/user.json"
import feeds from "../../fixtures/feeds.json"

const username = user.registered.user1.username,
    password = user.registered.user1.password,
    validUrl = feeds.url.valid,
    invalidUrl = feeds.url.invalid;

describe('New Feed',()=>{

    beforeEach(function(){
        Cypress.Cookies.preserveOnce('sessionid','csrftoken')
    })

    before(function(){
        cy.login(username,password)
    })
  
    it('should create a feed with a new RSS Url',()=>{
        cy.addFeed(validUrl[0])
        cy.get('.dl-horizontal dd').then((item)=>{
            expect(item[0]).to.contain.text(username)
            expect(item[1]).to.contain.text(validUrl[0])
        })        
    })

    it('should display the newly created feed in My feeds list',()=>{
       cy.get('a[href="/feeds/my/"]').click()
       cy.contains(validUrl[0]).and('be.visible') 
    })

    it('should display the newly created feed in All feeds list',()=>{
        cy.get('a[href="/feeds/"]').click()
        cy.contains(validUrl[0]).and('be.visible') 
    })

    it('should not display the newly created feed in Bookmarked list',()=>{
        cy.get('a[href="/feeds/"]').click()
        cy.contains(validUrl[0]).and('be.visible') 
    })

    it('should not add the feed that already exist',()=>{
        cy.addFeed(validUrl[0])
        cy.get('#error_1_id_feed_url').contains('Feed with this Feed URL already exists.')
    }) 

    it('should not add the invalid feed URL',()=>{
        for (let i =0; i < invalidUrl.length; i++){
            cy.addFeed(invalidUrl[i])
            cy.get('#error_1_id_feed_url').should('be.visible').and('contain', 'Enter a valid URL.')
        }
    }) 
    
})