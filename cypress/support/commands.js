Cypress.Commands.add('autentica', (username, password) => {
    cy.session([username, password], () => {
        cy.request({
            url: '/auth',
            method: 'POST',
            log: true,
            body: {
                username,
                password
            }   
        })
    }, { cacheAcrossSpecs: true })
}) 

/* Cypress.Commands.add('autentica', () => {
    cy.session('admin', () => {
        cy.request({
            method: 'POST',
            url: '/auth',
            log: true,
            body: {
                username: 'admin',
                password: 'password123'
            }   
        })
    }, { cacheAcrossSpecs: true })
}) */