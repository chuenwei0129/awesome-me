/*
    Test the POST /user/:user_id/follow and DELETE /user/:user_id/follow end points
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



describe('Test user following if not logged in', async () => {
    before(async () => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 401 status code for following existing users when not logged in: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/users/' + i + '/follow')
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


describe('Test user following once logged in', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 200 status code for following existing users when authenticated: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/users/' + i + '/follow')
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
        it('Should return 403 status code for following existing users when authenticated who the user is already following: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/users/' + i + '/follow')
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
        it('Should return 404 when trying to follow a user that does not exist in the application: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .post('/users/' + i + '/follow')
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

describe('Test user unfollowing if not logged in', async () => {
    before(async () => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 401 status code for unfollowing existing users when not logged in: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/users/' + i + '/follow')
                .then((res) => {
                    expect(res).to.have.status(401)
                })
                .catch((err) => {
                    throw err
                })
        })
    }
})

describe('Test user unfollowing once logged in', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    for(let i = 1; i<=10; i++){
        it('Should return 200 status code for unfollowing existing users when authenticated: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/users/' + i + '/follow')
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
        it('Should return 403 status code for unfollowing existing users when authenticated who the user is already following: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/users/' + i + '/follow')
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
        it('Should return 404 when trying to unfollow a user that does not exist in the application: user_id ' + i, () => {
            return chai.request(SERVER_URL)
                .delete('/users/' + i + '/follow')
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