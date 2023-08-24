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
it('create token com username em branco', () => {
    cy.request({
        url: '/auth',
        method: 'POST',
        log: true,
        body: {
            "username" : "",
            "password" : "password123"
        }
    }).then(({ status, duration, body }) => {
        expect(status, 'Status Code').to.eq(200),
        expect(duration, 'Duration').to.be.lessThan(5000)
        expect(body.reason, 'Erro').to.eq('Bad credentials')
    })
})

it('create token com password em branco', () => {
    cy.request({
        url: '/auth',
        method: 'POST',
        log: true,
        body: {
            "username" : "admin",
            "password" : ""
        }
    }).then(({ status, duration, body }) => {
        expect(status, 'Status Code').to.eq(200),
        expect(duration, 'Duration').to.be.lessThan(5000)
        expect(body.reason, 'Erro').to.eq('Bad credentials')
    })
})

it('create token com password inválido', () => {
    cy.request({
        url: '/auth',
        method: 'POST',
        log: true,
        body: {
            "username" : "admin",
            "password" : "password12"
        }
    }).then(({ status, duration, body }) => {
        expect(status, 'Status Code').to.eq(200),
        expect(duration, 'Duration').to.be.lessThan(5000)
        expect(body.reason, 'Erro').to.eq('Bad credentials')
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

it('create booking / firstname com 500 caracteres', () => {
    cy.request({
        url: '/booking',
        method: 'POST',
        log: true,
        body: {
            "firstname" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit nisl quis nisl egestas, non tristique est eleifend. Vivamus vestibulum vestibulum scelerisque. Etiam sagittis laoreet felis, vel rhoncus urna tincidunt non. Fusce non augue massa. Praesent in facilisis lorem. Suspendisse semper est velit, quis ultrices massa suscipit nec. Duis ac fermentum erat, in gravida elit. Proin nec sapien quis lectus bibendum semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum sed arcu non orci interdum malesuada ac eu tellus. Sed ullamcorper arcu id turpis dictum, nec bibendum elit tempor. Nam ut justo id neque bibendum euismod quis eu lorem. Nunc faucibus, risus ut suscipit ultrices, eros ex aliquam turpis, vel gravida metus mi eu neque. Quisque et euismod ipsum. Quisque in nulla vel nisl rhoncus vestibulum.a",
            "lastname" : "O",
            "totalprice" : 142,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2020-01-01"}
        }
    }).then((response) => {
        expect(response.status, 'Status Code').to.eq(200), // BUG - aceitar campo muito longo
        expect(response.duration, 'Duration').to.be.lessThan(5000),
        expect(response.body.booking.lastname, 'Last name').to.eq('O')
        expect(response.body.booking.totalprice, 'Total Price').to.eq(142)
    })
})

it('create booking com firstname em branco', () => {
    cy.request({
        url: '/booking',
        method: 'POST',
        log: true,
        body: {
            "firstname" : "",
            "lastname" : "O",
            "totalprice" : 142,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2020-01-01"}
        }
    }).then((response) => {
        expect(response.status, 'Status Code').to.eq(200), //BUG não deveria aceitar firstname em branco - 403
        expect(response.duration, 'Duration').to.be.lessThan(5000),
        expect(response.body.booking.firstname, 'First Name').to.eq('')
    })
})

it('create booking com lastname em branco', () => {
    cy.request({
        url: '/booking',
        method: 'POST',
        log: true,
        body: {
            "firstname" : "Érica",
            "lastname" : "",
            "totalprice" : 142,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2020-01-01"}
        }
    }).then((response) => {
        expect(response.status, 'Status Code').to.eq(200), //BUG não deveria aceitar lastname em branco - 403
        expect(response.duration, 'Duration').to.be.lessThan(5000),
        expect(response.body.booking.lastname, 'Last name').to.eq('')
    })
})

/* it('create booking com bookingdates/checkin em branco', () => {
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
                "checkin" : "",
                "checkout" : "2020-01-01"}
        }
    }).then((response) => {
        expect(response.status, 'Status Code').to.eq(200),
        expect(response.duration, 'Duration').to.be.lessThan(5000),
        expect(response.body.booking.bookingdates.checkin, 'Checkin Date').to.be.null
    })
}) */

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

it('getting booking com id inválido', () => {
    cy.request({
        url: '/booking/100000000100}',
        method: 'GET',
        log: true,
        failOnStatusCode: false
    }).then(({ status, duration }) => {
        expect(status, 'Status Code').to.eq(404),
        expect(duration, 'Duration').to.be.lessThan(5000)
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

it('update booking com firstname em branco', () => {
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
                        failOnStatusCode: false,
                        body: {
                            "firstname" : "",
                            "lastname" : "O",
                            "totalprice" : 400,
                            "depositpaid" : true,
                            "bookingdates" : {
                                "checkin" : "2018-01-01",
                                "checkout" : "2020-01-01"}
                        }
                    }).then(({ status, duration }) => {
                        expect(status, 'Status Code').to.eq(200), // BUG deveria ser Status Code 405 ou 403
                        expect(duration, 'Duration').to.be.lessThan(5000)
                    })
                })
        })
}) 

it('update booking com lastname com 500 caracteres', () => {
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
                            "lastname" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit nisl quis nisl egestas, non tristique est eleifend. Vivamus vestibulum vestibulum scelerisque. Etiam sagittis laoreet felis, vel rhoncus urna tincidunt non. Fusce non augue massa. Praesent in facilisis lorem. Suspendisse semper est velit, quis ultrices massa suscipit nec. Duis ac fermentum erat, in gravida elit. Proin nec sapien quis lectus bibendum semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum sed arcu non orci interdum malesuada ac eu tellus. Sed ullamcorper arcu id turpis dictum, nec bibendum elit tempor. Nam ut justo id neque bibendum euismod quis eu lorem. Nunc faucibus, risus ut suscipit ultrices, eros ex aliquam turpis, vel gravida metus mi eu neque. Quisque et euismod ipsum. Quisque in nulla vel nisl rhoncus vestibulum.a",
                            "totalprice" : 500,
                            "depositpaid" : true,
                            "bookingdates" : {
                                "checkin" : "2018-01-01",
                                "checkout" : "2020-01-01"}
                        }
                    }).then(({ status, duration, body }) => {
                        expect(status, 'Status Code').to.eq(200),  //BUG campo muito longo STATUS CODE deveria ser 403
                        expect(duration, 'Duration').to.be.lessThan(5000),
                        expect(body.firstname, 'First Name').to.eq('Camila')
                        expect(body.totalprice, 'Total Price').to.eq(500)
                    })
                })
        })
}) 

it('update booking sem autenticar', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.request({
                url: `/booking/${response.body.bookingid}`,
                method: 'PUT',
                log: true,
                failOnStatusCode: false,
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
                expect(status, 'Status Code').to.eq(403),
                expect(duration, 'Duration').to.be.lessThan(5000)
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

it('partial update booking sem autenticar', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.request({
                url: `/booking/${response.body.bookingid}`,
                method: 'PATCH',
                log: true,
                failOnStatusCode: false,
                body: {
                    "firstname" : "Joana",
                    "totalprice" : 300
                }
            }).then(({ status, duration, body }) => {
                expect(status, 'Status Code').to.eq(403),
                expect(duration, 'Duration').to.be.lessThan(5000)
                expect(body, 'First Name').to.eq('Forbidden')
            })
        })
})


it('partial update booking com id inválida', () => {
    cy.readFile('cypress/fixtures/token.json') 
        .then((body) => {
            body.token
            cy.setCookie('token', body.token)
            cy.request({
                url: '/booking/1115111a11151111111111111',
                method: 'PATCH',
                Cookie: `token=${body.token}`,
                failOnStatusCode: false,
                log: true,
                body: {
                    "firstname" : "Joana",
                    "totalprice" : 300
                }
            }).then(({ status, duration, body }) => {
                expect(status, 'Status Code').to.eq(405),
                expect(duration, 'Duration').to.be.lessThan(5000)
                expect(body, 'First Name').to.eq('Method Not Allowed')
            })
        })
})

it('partial update booking com firstname em branco', () => {
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
                        failOnStatusCode: false,
                        log: true,
                        body: {
                            "firstname" : "", //BUG permite firstname em branco
                            "totalprice" : 3300
                        }
                    }).then(({ status, duration }) => {
                        expect(status, 'Status Code').to.eq(200),
                        expect(duration, 'Duration').to.be.lessThan(5000)
                        //expect(body, 'First Name').to.eq('') corrigir assertions
                    })
                })
        })
})

it('partial update booking com total price em branco', () => {
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
                        failOnStatusCode: false,
                        log: true,
                        body: {
                            "firstname" : "Joaninha",
                            "totalprice" : ""
                        }
                    }).then(({ status, duration, body }) => {
                        expect(status, 'Status Code').to.eq(200), //BUG aceita reserva sem valor - era pra ser 405
                        expect(duration, 'Duration').to.be.lessThan(5000),
                        expect(body.firstname, 'First Name').to.eq('Joaninha')
                    })
                })
        })
})

it('partial update booking com total price com 100 caracteres', () => {
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
                        failOnStatusCode: false,
                        log: true,
                        body: {
                            "firstname" : "Joana",
                            "totalprice" : 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
                        }
                    }).then(({ status, duration, body }) => {
                        expect(status, 'Status Code').to.eq(200), //BUG deveria ser 405 - não aceitar 100 caracteres
                        expect(duration, 'Duration').to.be.lessThan(5000),
                        expect(body.firstname, 'First Name').to.eq('Joana')
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

it('delete booking sem autenticar', () => {
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.request({
                url: `/booking/${response.body.bookingid}`,
                method: 'DELETE',
                failOnStatusCode: false,
                log: true                   
            }).then(({ status, duration }) => {
                expect(status, 'Status Code').to.eq(403),
                expect(duration, 'Duration').to.be.lessThan(5000)
            })
        })
})

/*
it('delete booking - session', () => {
    cy.autentica('admin', 'password123')
    cy.readFile('cypress/fixtures/booking.json') 
        .then((response) => {
            response.body.bookingid
            cy.request({
                url: `/booking/${response.body.bookingid}`,
                method: 'DELETE',
                log: true                   
            }).then(({ status, duration }) => {
                expect(status, 'Status Code').to.eq(201),
                expect(duration, 'Duration').to.be.lessThan(5000)
            })
        })
}) */
