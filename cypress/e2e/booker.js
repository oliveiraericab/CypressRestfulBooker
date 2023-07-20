it('create token', () => {
    cy.request({
        url: '/auth',
        method: 'POST',
        log: true,
        body: {
            "username" : "admin",
            "password" : "password123"
        }
    }).then(({ status, duration, body }) => {
        expect(status, 'Status Code').to.eq(200),
        expect(duration, 'Duration').to.be.lessThan(5000)
        expect(body.token, 'Token').to.have.lengthOf(15)
        cy.writeFile('cypress/fixtures/token.json', body)
    })
})

it('create booking', () => {
    cy.request({
        url: '/booking',
        method: 'POST',
        log: true,
        body: {
            "firstname" : "Érica",
            "lastname" : "O",
            "totalprice" : 142,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2020-01-01"}
        }
    }).then((response) => {
        expect(response.status, 'Status Code').to.eq(200),
        expect(response.duration, 'Duration').to.be.lessThan(5000),
        expect(response.body.booking.firstname, 'First Name').to.eq('Érica'),
        expect(response.body.booking.lastname, 'Last name').to.eq('O')
        expect(response.body.booking.totalprice, 'Total Price').to.eq(142)
        cy.writeFile('cypress/fixtures/booking.json', response)
    })
})

it('get booking ids', () => {
    cy.request({
        url: '/booking',
        method: 'GET',
        log: true,
    }).then(({ status, duration }) => {
        expect(status, 'Status Code').to.eq(200),
        expect(duration, 'Duration').to.be.lessThan(5000)
    })
})  

it('getting booking', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.request({
                url: `/booking/${response.body.bookingid}`,
                method: 'GET',
                log: true,
            }).then(({ status, duration, body }) => {
                expect(status, 'Status Code').to.eq(200),
                expect(duration, 'Duration').to.be.lessThan(5000)
                expect(body.firstname, 'First Name').to.eq('Érica'),
                expect(body.lastname, 'Last name').to.eq('O')
                expect(body.totalprice, 'Total Price').to.eq(142)
            })
        })
})

it('update booking lendo token.json', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.readFile('cypress/fixtures/token.json') 
                .then((body) => {
                    body.token
                    cy.setCookie('token', body.token)
                    cy.request({
                        url: `/booking/${response.body.bookingid}`,
                        method: 'PUT',
                        Cookie: `token=${body.token}`,
                        log: true,
                        body: {
                            "firstname" : "Camila",
                            "lastname" : "O",
                            "totalprice" : 400,
                            "depositpaid" : true,
                            "bookingdates" : {
                                "checkin" : "2018-01-01",
                                "checkout" : "2020-01-01"}
                        }
                    }).then(({ status, duration, body }) => {
                        expect(status, 'Status Code').to.eq(200),
                        expect(duration, 'Duration').to.be.lessThan(5000),
                        expect(body.firstname, 'First Name').to.eq('Camila')
                        expect(body.totalprice, 'Total Price').to.eq(400)
                    })
                })
        })
}) 

it('update booking logando no teste', () => {
    cy.request({
        url: '/auth',
        method: 'POST',
        log: true,
        body: {
            "username" : "admin",
            "password" : "password123"
        }
    }).then(({ body }) => {
        cy.setCookie('token', body.token)
        cy.readFile('cypress/fixtures/booking.json') 
            .then((response) => {
                response.body.bookingid
                cy.request({
                    url: `/booking/${response.body.bookingid}`,
                    method: 'PUT',
                    log: true,
                    body: {
                        "firstname" : "Camila",
                        "lastname" : "O",
                        "totalprice" : 400,
                        "depositpaid" : true,
                        "bookingdates" : {
                            "checkin" : "2018-01-01",
                            "checkout" : "2020-01-01"}
                    }
                }).then(({ status, duration, body }) => {
                    expect(status, 'Status Code').to.eq(200),
                    expect(duration, 'Duration').to.be.lessThan(5000),
                    expect(body.firstname, 'First Name').to.eq('Camila')
                    expect(body.totalprice, 'Total Price').to.eq(400)
                })
            })
    })
})

it('partial update booking lendo token.json', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.readFile('cypress/fixtures/token.json') 
                .then((body) => {
                    body.token
                    cy.setCookie('token', body.token)
                    cy.request({
                        url: `/booking/${response.body.bookingid}`,
                        method: 'PATCH',
                        Cookie: `token=${body.token}`,
                        log: true,
                        body: {
                            "firstname" : "Joana",
                            "totalprice" : 300
                        }
                    }).then(({ status, duration, body }) => {
                        expect(status, 'Status Code').to.eq(200),
                        expect(duration, 'Duration').to.be.lessThan(5000),
                        expect(body.firstname, 'First Name').to.eq('Joana')
                        expect(body.totalprice, 'Total Price').to.eq(300)
                    })
                })
        })
})

it('delete booking lendo token.json', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.readFile('cypress/fixtures/token.json') 
                .then((body) => {
                    body.token
                    cy.setCookie('token', body.token)
                    cy.request({
                        url: `/booking/${response.body.bookingid}`,
                        method: 'DELETE',
                        Cookie: `token=${body.token}`,
                        log: true                   
                    }).then(({ status, duration }) => {
                        expect(status, 'Status Code').to.eq(201),
                        expect(duration, 'Duration').to.be.lessThan(5000)
                    })
                })
        })
})