import user from "../../fixtures/user.json"
import feeds from "../../fixtures/feeds.json"

const username = user.registered.user1.username,
      password = user.registered.user1.password,
      feedTitle = feeds.title,
      feedComment = feeds.comment;

describe('Comment Markdown',()=>{

    beforeEach(function(){
        Cypress.Cookies.preserveOnce('sessionid','csrftoken')
    })

    before(function(){
        cy.login(username,password)
        cy.get('a[href="/feeds/"]').click()
        cy.contains(feedTitle).click()
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
    })

    it('should be able to comment with heading 1',()=>{
        cy.submitComment('# Comment with heading 1')
        cy.get('h1').and('contain','Comment with heading 1').should('be.visible')
    })

    it('should be able to comment with heading 2',()=>{
        cy.submitComment('## Comment with heading 2')
        cy.get('h2').and('contain','Comment with heading 2').should('be.visible')
    })

    it('should be able to comment with bold format',()=>{
        cy.submitComment('**Comment with bold**')
        cy.get('p strong').and('contain','Comment with bold').should('be.visible')
    })

    it('should be able to comment with italic format',()=>{
        cy.submitComment('*Comment with italic*')
        cy.get('p em').and('contain','Comment with italic').should('be.visible')
    })

    it('should be able to comment with quote',()=>{
        cy.submitComment('>Comment with quote')
        cy.get('blockquote p').and('contain','Comment with quote').should('be.visible')
    })

    it('should be able to comment with ordered list',()=>{
        cy.get('.fa-list-ol').click()
        cy.get('.CodeMirror-lines').type('Ordered list1 {enter}')
        cy.get('.CodeMirror-lines').type('Ordered list2')
        cy.get('#submit-id-submit').click()
        cy.get(':nth-child(1) > .col-sm-11 ol').then((li)=>{
            expect(li[0]).to.contain('Ordered list1')
            expect(li[1]).to.contain('Ordered list2')
        })
    })

    it('should be able to comment with unordered list',()=>{
        cy.get('.fa-list-ul').click()
        cy.get('.CodeMirror-lines').type('Unordered list1 {enter}')
        cy.get('.CodeMirror-lines').type('Unordered list2')
        cy.get('#submit-id-submit').click()
        cy.get(':nth-child(1) > .col-sm-11 ul li').then((item)=>{
            expect(item[0]).to.contain.text('Unordered list1')
            expect(item[1]).to.contain.text('Unordered list2')
        })
    })

    it('should able to add link in the comment',()=>{
        cy.submitComment('[Example](http://example.com)')
        cy.get('#submit-id-submit').click()
        cy.get('p a').should('have.attr', 'href','http://example.com').and('contain','Example').and('has.css','color','#0da0c1')
    })
   
    it('should able to add image in the comment',()=>{
        cy.submitComment('![Image](https://cdn.pixabay.com/photo/2016/03/21/23/25/link-1271843_960_720.png)')
        cy.get('#submit-id-submit').click()
        cy.get('p img').should('have.attr', 'src','https://cdn.pixabay.com/photo/2016/03/21/23/25/link-1271843_960_720.png')
    })

})