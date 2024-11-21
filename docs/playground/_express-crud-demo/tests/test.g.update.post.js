/*
    Test the PATCH /post/:post_id
*/
const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path')
const filename = path.basename(__filename)

const good_user_data = require('./data/good_user_data.json')

const SERVER_URL = 'http://localhost:3333'
let SESSION_TOKEN_USER1 = ''
let SESSION_TOKEN_USER2 = ''

describe('Updating a post when not authenticated', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return a 401', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/1')
            .then((res) => {
                expect(res).to.have.status(401)
            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Log into user account', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return 200, and JSON with user_id and session_token of the user', () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send({
                "username": good_user_data[0].username,
                "password": good_user_data[0].password
                })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property("user_id")
                expect(res.body).to.have.property("session_token")
                SESSION_TOKEN_USER1 = res.body.session_token
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 200, and JSON with user_id and session_token of the user', () => {
        return chai.request(SERVER_URL)
            .post("/login")
            .send({
                "username": good_user_data[1].username,
                "password": good_user_data[1].password
                })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.have.property("user_id")
                expect(res.body).to.have.property("session_token")
                SESSION_TOKEN_USER2 = res.body.session_token
            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Updating a post when authenticated', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return a 200', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/1')
            .set('X-Authorization', SESSION_TOKEN_USER1)
            .send({"text": "Hello World"})
            .then((res) => {
                expect(res).to.have.status(200)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 400 if text is empty', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/1')
            .set('X-Authorization', SESSION_TOKEN_USER1)
            .send({"text": ""})
            .then((res) => {
                expect(res).to.have.status(400)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 400 if text is missing', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/1')
            .set('X-Authorization', SESSION_TOKEN_USER1)
            .send({})
            .then((res) => {
                expect(res).to.have.status(400)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 400 if extra field is present', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/1')
            .set('X-Authorization', SESSION_TOKEN_USER1)
            .send({"text": "Hell World", "extra": "field"})
            .then((res) => {
                expect(res).to.have.status(400)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 403 if post was not authored by the logged in user', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/1')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .send({"text": "Hello World"})
            .then((res) => {
                expect(res).to.have.status(403)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 404 if post does not exist', () => {
        return chai.request(SERVER_URL)
            .patch('/posts/11')
            .set('X-Authorization', SESSION_TOKEN_USER1)
            .send({"text": "Hello World"})
            .then((res) => {
                expect(res).to.have.status(404)
            })
            .catch((err) => {
                throw err
            })
    })
})

