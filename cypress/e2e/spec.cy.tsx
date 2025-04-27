describe('Test page', () => {
    it('passes', () => {
        cy.visit('/')
        cy.contains('Get started by editing src/app/page.tsx')

        cy.get('a').contains('Deploy')
        cy.get('a').contains('Deploy').click()
    })
})