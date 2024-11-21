/*
    Test the POST /post/:post_id/like and DELETE /post/:post_id/like end points
*/
const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path')
const filename = path.basename(__filename)

const good_user_data = require('./data/good_user_data.json')

const SERVER_URL = 'http://localhost:3333'
let SESSION_TOKEN = ''



describe('Test like post if not logged in', async () => {
    before(async () => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 401 status code for liking posts when not logged in: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/posts/' + i + '/like')
                .then((res) => {
                    expect(res).to.have.status(401)
                })
                .catch((err) => {
                    throw err
                })
        })
    }
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
                SESSION_TOKEN = res.body.session_token
            })
            .catch((err) => {
                throw err
            })
    })
})


describe('Test liking post once logged in', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 200 status code for liking posts when authenticated: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/posts/' + i + '/like')
                .set('X-Authorization', SESSION_TOKEN)
                .then((res) => {
                    expect(res).to.have.status(200)
                })
                .catch((err) => {
                    throw err
                })
        })
    }

    for(let i = 1; i<=10; i++){
        it('Should return 403 status code for liking existing posts when authenticated when the user has already liked the post: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/posts/' + i + '/like')
                .set('X-Authorization', SESSION_TOKEN)
                .then((res) => {
                    expect(res).to.have.status(403)
                })
                .catch((err) => {
                    throw err
                })
        })
    }

    // Start from 11 this time for 404
    for(let i = 11; i<=20; i++){
        it('Should return 404 when trying to like a post that does not exist in the application: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/posts/' + i + '/like')
                .set('X-Authorization', SESSION_TOKEN)
                .then((res) => {
                    expect(res).to.have.status(404)
                })
                .catch((err) => {
                    throw err
                })
        })
    }
})

describe('Test user unliking posts if not logged in', async () => {
    before(async () => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 401 status code for unliking existing posts when not logged in: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/posts/' + i + '/like')
                .then((res) => {
                    expect(res).to.have.status(401)
                })
                .catch((err) => {
                    throw err
                })
        })
    }
})

describe('Test unlikng post once logged in', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 200 status code for unliking existing posts when authenticated: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/posts/' + i + '/like')
                .set('X-Authorization', SESSION_TOKEN)
                .then((res) => {
                    expect(res).to.have.status(200)
                })
                .catch((err) => {
                    throw err
                })
        })
    }

    for(let i = 1; i<=10; i++){
        it('Should return 403 status code for unliking existing posts when authenticated when the user has not liked the post: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/posts/' + i + '/like')
                .set('X-Authorization', SESSION_TOKEN)
                .then((res) => {
                    expect(res).to.have.status(403)
                })
                .catch((err) => {
                    throw err
                })
        })
    }

    // Start from 11 this time for 404
    for(let i = 11; i<=20; i++){
        it('Should return 404 when trying to unlike a post that does not exist in the application: post_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/posts/' + i + '/like')
                .set('X-Authorization', SESSION_TOKEN)
                .then((res) => {
                    expect(res).to.have.status(404)
                })
                .catch((err) => {
                    throw err
                })
        })
    }
})