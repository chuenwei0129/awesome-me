/*
    Test the POST /login and POST /logout endpoints
*/
const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path')
const filename = path.basename(__filename)

const SERVER_URL = 'http://localhost:3333'
let SESSION_TOKEN = ''

const good_user_data = require('./data/good_user_data.json')

describe('Test user login/logout', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return 200 status code for successful login', () => {
        return chai.request(SERVER_URL)
            .post('/login')
            .send({
                "username": good_user_data[0].username,
                "password": good_user_data[0].password
            })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property('user_id')
                expect(res.body).to.have.property('session_token')
                SESSION_TOKEN = res.body['session_token']
            })
            .catch((err) => {
                throw err
            })
    })

    it("Should return the same token if a logged in user tried to login again", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send({
                "username": good_user_data[0].username,
                "password": good_user_data[0].password
            })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property('user_id')
                expect(res.body).to.have.property('session_token')
                expect(res.body.session_token).to.equal(SESSION_TOKEN)
            })
            .catch((err) => {
                throw err
            })
    })

    it("Should return 400 status code for incorrect username", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send(
                {
                    username: 'dodgyuser',
                    password: good_user_data[0].password
                }
            )
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
               throw err
            })
    })

    it("Should return 400 status code for incorrect password", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send(
                {
                    email: good_user_data[0].email,
                    password: 'badpassword'
                }
            )
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
               throw err
            })
    })

    it("Should return 400 status code for missing password", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send(
                {
                    username: good_user_data[0].username,
                }
            )
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
               throw err
            })
    })

    it("Should return 400 status code for missing username", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send(
                {
                    password: "hello",
                }
            )
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
               throw err
            })
    })

    it("Should return 400 status code for extra field", () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send(
                {
                    username: good_user_data[0].username,
                    password: good_user_data[0].password,
                    "extra": "field"
                }
            )
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
               throw err
            })
    })

    it("Should return 401 status code for logging out user not logged in", () => {
        return chai.request(SERVER_URL)
            .post("/logout")
            .set("X-Authorization", "hello")
            .then((res) => {
               expect(res).to.have.status(401)
            })
            .catch((err) => {
               throw err
            })
    })

    it("Should return 200 status code for logging out user who is logged in", () => {
        return chai.request(SERVER_URL)
            .post("/logout")
            .set("X-Authorization", SESSION_TOKEN)
            .then((res) => {
                expect(res).to.have.status(200)
            })
            .catch(function (err) {
                throw err
            })
    })
})