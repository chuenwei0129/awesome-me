/* 
    Test the POST /posts end point
*/
const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path')
const filename = path.basename(__filename)

const good_user_data = require('./data/good_user_data.json')
const good_post_data = require('./data/good_post_data.json')

const SERVER_URL = 'http://localhost:3333'
let SESSION_TOKEN = ''

describe("Test adding posts if not logged in", () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    good_post_data.forEach((post) => {
        it('Should return 401', () => {
            return chai.request(SERVER_URL)
                .post('/posts')
                .send({
                    "text": post.text
                })
                .then((res) => {
                    expect(res).to.have.status(401)
                })
                .catch((err) => {
                    throw err
                })
        })
    })
})

describe("Log into admin account.", () => {

    before(() => {
        console.log("[Script: " + filename + "]")
    })

    it("Should return 200, and JSON with user_id and session_token", () => {
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
                SESSION_TOKEN = res.body.session_token
            })
            .catch((err) => {
                throw err
            })
    })
})

describe("Test adding posts if logged in", () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    good_post_data.forEach((post) => {
        it('Should return 201, and JSON with the post_id of new post', () => {
            return chai.request(SERVER_URL)
                .post('/posts')
                .set('X-Authorization', SESSION_TOKEN)
                .send({
                    "text": post.text
                })
                .then((res) => {
                    expect(res).to.have.status(201)
                    expect(res).to.be.json
                    expect(res.body).to.have.property("post_id")
                })
                .catch((err) => {
                    throw err
                })
        })
    })

    it('Should return 400 if text is empty', () => {
        return chai.request(SERVER_URL)
            .post('/posts')
            .set('X-Authorization', SESSION_TOKEN)
            .send({
                "text": ""
            })
            .then((res) => {
                expect(res).to.have.status(400)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 400 if text is missing', () => {
        return chai.request(SERVER_URL)
            .post('/posts')
            .set('X-Authorization', SESSION_TOKEN)
            .send({
            })
            .then((res) => {
                expect(res).to.have.status(400)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 400 if extra field is present', () => {
        return chai.request(SERVER_URL)
            .post('/posts')
            .set('X-Authorization', SESSION_TOKEN)
            .send({
                "text": "Hello",
                "extra": "field"
            })
            .then((res) => {
                expect(res).to.have.status(400)
            })
            .catch((err) => {
                throw err
            })
    })
})
