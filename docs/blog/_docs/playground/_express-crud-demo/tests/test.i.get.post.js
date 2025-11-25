/*
    Test the GET /post/:post_id
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

describe('Test getting the details of a single post', () => {
    it('Should return 200, with the details of the post', () => {
        return chai.request(SERVER_URL)
            .get('/posts/2')
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.headers['content-type']).to.have.string('application/json');
                expect(res.body).to.have.property("post_id")
                expect(res.body).to.have.property("timestamp")
                expect(res.body).to.have.property("text")
                expect(res.body).to.have.property("author")
                expect(res.body).to.have.property("likes")

                //expect(res.body.author).to.be.json
                expect(res.body.author).to.have.property("user_id")
                expect(res.body.author).to.have.property("first_name")
                expect(res.body.author).to.have.property("last_name")
                expect(res.body.author).to.have.property("username")

                expect(res.body.likes).to.be.an('array')
                expect(res.body.likes.length).to.equal(0)
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
                expect(res.headers['content-type']).to.have.string('application/json');
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

describe('Liking a post when authenticated', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return a 200', () => {
        return chai.request(SERVER_URL)
            .post('/posts/2/like')
            .set('X-Authorization', SESSION_TOKEN_USER1)
            .then((res) => {
                expect(res).to.have.status(200)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return a 200', () => {
        return chai.request(SERVER_URL)
            .post('/posts/2/like')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .then((res) => {
                expect(res).to.have.status(200)
            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Test getting the details of a single post with likes', () => {
    it('Should return 200, with the details of the post', () => {
        return chai.request(SERVER_URL)
            .get('/posts/2')
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.headers['content-type']).to.have.string('application/json');
                expect(res.body).to.have.property("post_id")
                expect(res.body).to.have.property("timestamp")
                expect(res.body).to.have.property("text")
                expect(res.body).to.have.property("author")
                expect(res.body).to.have.property("likes")

                //expect(res.body.author).to.be.json
                expect(res.body.author).to.have.property("user_id")
                expect(res.body.author).to.have.property("first_name")
                expect(res.body.author).to.have.property("last_name")
                expect(res.body.author).to.have.property("username")

                expect(res.body.likes).to.be.an('array')
                expect(res.body.likes.length).to.equal(2)

                res.body.likes.forEach((element) => {
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
})

describe('Getting a post that does not exist', () => {
    it('Should return 404', () => {
        return chai.request(SERVER_URL)
            .get('/posts/1')
            .then((res) => {
                expect(res).to.have.status(404)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 404', () => {
        return chai.request(SERVER_URL)
            .get('/posts/11')
            .then((res) => {
                expect(res).to.have.status(404)
            })
            .catch((err) => {
                throw err
            })
    })
})

