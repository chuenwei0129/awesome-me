/*
    Test the GET /feed
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

describe('Test getting the feed without being authenticated', () => {
    it('Should return 200, with a list of posts', () => {
        return chai.request(SERVER_URL)
            .get('/feed')
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                
                let count = 10
                expect(res.body.length).to.equal(count-1)

                res.body.forEach((element) => {
                    expect(element).to.have.property("post_id")
                    expect(element).to.have.property("timestamp")
                    expect(element).to.have.property("text")
                    expect(element).to.have.property("author")
                    expect(element).to.have.property("likes")

                    expect(element.post_id).to.equal(count)
                    count--

                    //expect(res.body.author).to.be.json
                    expect(element.author).to.have.property("user_id")
                    expect(element.author).to.have.property("first_name")
                    expect(element.author).to.have.property("last_name")
                    expect(element.author).to.have.property("username")

                    expect(element.likes).to.be.an('array')
                    
                    element.likes.forEach((like) => {
                        expect(like).to.have.property("user_id")
                        expect(like).to.have.property("first_name")
                        expect(like).to.have.property("last_name")
                        expect(like).to.have.property("username")
                        expect(like).to.not.have.property("password")
                    })

                })
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

describe('Add a post for user two', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return 200', () => {
        return chai.request(SERVER_URL)
            .post('/posts')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .send({"text": "Hello world"})
            .then((res) => {
                expect(res).to.have.status(201)
            })
            .catch((err) => {
                throw err
            })

    })
})

describe('Test getting the feed authenticated as user two', () => {
    it('Should return 200, with a list of posts', () => {
        return chai.request(SERVER_URL)
            .get('/feed')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                
                let count = 11
                expect(res.body.length).to.equal(count-1)

                res.body.forEach((element) => {
                    expect(element).to.have.property("post_id")
                    expect(element).to.have.property("timestamp")
                    expect(element).to.have.property("text")
                    expect(element).to.have.property("author")
                    expect(element).to.have.property("likes")

                    expect(element.post_id).to.equal(count)
                    count--

                    //expect(res.body.author).to.be.json
                    expect(element.author).to.have.property("user_id")
                    expect(element.author).to.have.property("first_name")
                    expect(element.author).to.have.property("last_name")
                    expect(element.author).to.have.property("username")

                    expect(element.likes).to.be.an('array')
                    
                    element.likes.forEach((like) => {
                        expect(like).to.have.property("user_id")
                        expect(like).to.have.property("first_name")
                        expect(like).to.have.property("last_name")
                        expect(like).to.have.property("username")
                        expect(like).to.not.have.property("password")
                    })

                })
            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Unfollow user one as user two', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    it('Should return 200', () => {
        return chai.request(SERVER_URL)
            .delete('/users/1/follow')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .then((res) => {
                expect(res).to.have.status(200)
            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Test getting the feed authenticated as user two after unfollowing user one', () => {
    it('Should return 200, with a list of posts', () => {
        return chai.request(SERVER_URL)
            .get('/feed')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                
                let count = 11
                expect(res.body.length).to.equal(1)

                res.body.forEach((element) => {
                    expect(element).to.have.property("post_id")
                    expect(element).to.have.property("timestamp")
                    expect(element).to.have.property("text")
                    expect(element).to.have.property("author")
                    expect(element).to.have.property("likes")

                    expect(element.post_id).to.equal(count)
                    count--

                    //expect(res.body.author).to.be.json
                    expect(element.author).to.have.property("user_id")
                    expect(element.author).to.have.property("first_name")
                    expect(element.author).to.have.property("last_name")
                    expect(element.author).to.have.property("username")

                    expect(element.likes).to.be.an('array')
                    
                    element.likes.forEach((like) => {
                        expect(like).to.have.property("user_id")
                        expect(like).to.have.property("first_name")
                        expect(like).to.have.property("last_name")
                        expect(like).to.have.property("username")
                        expect(like).to.not.have.property("password")
                    })

                })
            })
            .catch((err) => {
                throw err
            })
    })
})
