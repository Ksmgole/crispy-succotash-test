import user from "../../fixtures/user.json"

const username1 = user.registered.user1.username,
    password1 = user.registered.user1.password,
    username2 = user.registered.user2.username,
    password2 = user.registered.user2.password;

describe('My Feeds',()=>{
    
    it('should display own added feeds only',()=>{
        cy.login(username1,password1)
        cy.get('a[href="/feeds/my/"]').click()
        cy.get('table tbody tr').then((item)=>{
            expect(item).to.have.length(10)
        })
    })

    it('should display a message if the user has not added any feed',()=>{
        cy.login(username2,password2)
        cy.get('a[href="/feeds/my/"]').click()
        cy.contains('Nothing to see here. Move on!').should('be.visible')
    })

})