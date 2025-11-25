/*
    Test the GET /users/:user_id
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

describe('Test getting the details of a single user', () => {
    it('Should return 200, with the details of the user', () => {
        return chai.request(SERVER_URL)
            .get('/users/1')
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.headers['content-type']).to.have.string('application/json');
                expect(res.body).to.have.property("user_id")
                expect(res.body).to.have.property("first_name")
                expect(res.body).to.have.property("last_name")
                expect(res.body).to.have.property("username")
                expect(res.body).to.have.property("followers")
                expect(res.body).to.have.property("following")
                expect(res.body).to.have.property("posts")

                expect(res.body.followers).to.be.an('array')
                expect(res.body.followers.length).to.equal(0)

                expect(res.body.following).to.be.an('array')
                expect(res.body.following.length).to.equal(0)

                expect(res.body.posts).to.be.an('array')
                expect(res.body.posts.length).to.equal(9)

                res.body.posts.forEach((element) => {
                    expect(element).to.have.property("post_id")
                    expect(element).to.have.property("timestamp")
                    expect(element).to.have.property("text")
                    expect(element).to.have.property("author")
                    expect(element).to.have.property("likes")

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

describe('Following a user when authenticated', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return a 200', () => {
            return chai.request(SERVER_URL)
                .post('/users/' + i + '/follow')
                .set('X-Authorization', SESSION_TOKEN_USER1)
                .then((res) => {
                    expect(res).to.have.status(200)
                })
                .catch((err) => {
                    throw err
                })
        })
    }

    it('Should return a 200', () => {
        return chai.request(SERVER_URL)
            .post('/users/1/follow')
            .set('X-Authorization', SESSION_TOKEN_USER2)
            .then((res) => {
                expect(res).to.have.status(200)
            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Test getting the details of a single user', () => {
    it('Should return 200, with the details of the user', () => {
        return chai.request(SERVER_URL)
            .get('/users/1')
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.headers['content-type']).to.have.string('application/json');
                expect(res.body).to.have.property("user_id")
                expect(res.body).to.have.property("first_name")
                expect(res.body).to.have.property("last_name")
                expect(res.body).to.have.property("username")
                expect(res.body).to.have.property("followers")
                expect(res.body).to.have.property("following")
                expect(res.body).to.have.property("posts")

                expect(res.body.followers).to.be.an('array')
                expect(res.body.followers.length).to.equal(2)

                res.body.followers.forEach((follower) => {
                    expect(follower).to.have.property("user_id")
                    expect(follower).to.have.property("first_name")
                    expect(follower).to.have.property("last_name")
                    expect(follower).to.have.property("username")
                    expect(follower).to.not.have.property("password")
                })

                expect(res.body.following).to.be.an('array')
                expect(res.body.following.length).to.equal(10)

                res.body.followers.forEach((following) => {
                    expect(following).to.have.property("user_id")
                    expect(following).to.have.property("first_name")
                    expect(following).to.have.property("last_name")
                    expect(following).to.have.property("username")
                    expect(following).to.not.have.property("password")
                })

                expect(res.body.posts).to.be.an('array')
                expect(res.body.posts.length).to.equal(9)

                res.body.posts.forEach((element) => {
                    expect(element).to.have.property("post_id")
                    expect(element).to.have.property("timestamp")
                    expect(element).to.have.property("text")
                    expect(element).to.have.property("author")
                    expect(element).to.have.property("likes")

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

describe('Getting a user that does not exist', () => {
    it('Should return 404', () => {
        return chai.request(SERVER_URL)
            .get('/users/11')
            .then((res) => {
                expect(res).to.have.status(404)
            })
            .catch((err) => {
                throw err
            })
    })

    it('Should return 404', () => {
        return chai.request(SERVER_URL)
            .get('/posts/a')
            .then((res) => {
                expect(res).to.have.status(404)
            })
            .catch((err) => {
                throw err
            })
    })
})

