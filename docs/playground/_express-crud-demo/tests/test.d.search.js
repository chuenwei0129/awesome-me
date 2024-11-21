/*
    Test the GET /search end point
*/
const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path')
const filename = path.basename(__filename)

const SERVER_URL = "http://localhost:3333"


describe('Test searching of users', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    // Test q = dan
    it('Should return 200 for a valid search with a search string of "dan"', () => {
        return chai.request(SERVER_URL)
            .get("/search?q=dan")
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(1)

                expect(res.body[0]).to.have.property("user_id")
                expect(res.body[0]).to.have.property("first_name")
                expect(res.body[0]).to.have.property("last_name")
                expect(res.body[0]).to.have.property("username")
                expect(res.body[0]).to.not.have.property("password")
            })
            .catch((err) => {
                throw err
            })
    })

    // Test q = dane
    it('Should return 200 for a valid search with a search string of "dane"', () => {
        return chai.request(SERVER_URL)
            .get("/search?q=dane")
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(0)
            })
            .catch((err) => {
                throw err
            })
    })

    // Test no q
    it('Should return 200 for a valid search with no search string', () => {
        return chai.request(SERVER_URL)
            .get("/search")
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(10)

                res.body.forEach((element) => {
                    expect(element).to.have.property("user_id")
                    expect(element).to.have.property("first_name")
                    expect(element).to.have.property("last_name")
                    expect(element).to.have.property("username")
                    expect(element).to.not.have.property("password")
                })
            })
            .catch((err) => {
                throw err
            })
    })

    // Test q = xx
    it('Should return 200 for a valid search with a search string of "xx"', () => {
        return chai.request(SERVER_URL)
            .get("/search?q=xx")
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(0)
            })
            .catch((err) => {
                throw err
            })
    })

    // Test q = 1
    it('Should return 200 for a valid search with a search string of "1"', () => {
        return chai.request(SERVER_URL)
            .get("/search?q=1")
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(1)
            })
            .catch((err) => {
                throw err
            })
    })

    // Test q = d
    it('Should return 200 for a valid search with a search string of "d"', () => {
        return chai.request(SERVER_URL)
            .get("/search?q=d")
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(7)
            })
            .catch((err) => {
                throw err
            })
    })
})


