/*
    Test the POST /user endpoint
*/
const chai = require("chai");
const chaiHttp = require("chai-http")

const expect = chai.expect
chai.use(chaiHttp)

const path = require('path')
const filename = path.basename(__filename)

const SERVER_URL = 'http://localhost:3333'
const good_user_data = require('./data/good_user_data.json');
const bad_user_data = require('./data/bad_user_data.json');

let user_ids = []

describe('Test successful creation of users', () => {
    before(() => {
        console.log("[Script: " + filename + "]")
    })

    good_user_data.forEach((user) => {
        it('Should return 201, and JSON with user_id of new user: ' + user.username, () => {
            return chai.request(SERVER_URL)
                .post("/users")
                .send({
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "username": user.username,
                    "password": user.password
                })
                .then((res) => {
                    expect(res).to.have.status(201)
                    expect(res).to.be.json
                    expect(res.body).to.have.property("user_id")

                    user_ids += res.body.user_id

                })
                .catch((err) => {
                    throw err
                })
        })
    })
})

describe('Test malformed creation of users', () => {
    before(() => {
        console.log('[Script: ' + filename + ']')
    })

    bad_user_data.forEach((user) => {
        it('Should return a 400 status code: ' + user.test_description, () => {
            return chai.request(SERVER_URL)
                .post('/users')
                .send({
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "username": user.username,
                    "password": user.password
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.json
                    expect(res.body).to.have.property('error_message')
                })
                .catch((err) => {
                    throw err
                })
        })
    })

    it('Should return 400 status code: missing first name', () => {
        return chai.request(SERVER_URL)
            .post('/users')
            .send({
                "last_name": good_user_data[0].last_name,
                "username": good_user_data[0].username,
                "password": good_user_data[0].password
            })
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
                throw err
            });
    });

    it('Should return 400 status code: missing last name', () => {
        return chai.request(SERVER_URL)
            .post('/users')
            .send({
                "first_name": good_user_data[0].first_name,
                "username": good_user_data[0].username,
                "password": good_user_data[0].password
            })
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
                throw err
            });
    });

    it('Should return 400 status code: missing usename', () => {
        return chai.request(SERVER_URL)
            .post('/users')
            .send({
                "first_name": good_user_data[0].first_name,
                "last_name": good_user_data[0].last_name,
                "password": good_user_data[0].password
            })
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
                throw err
            });
    });

    it('Should return 400 status code: missing password', () => {
        return chai.request(SERVER_URL)
            .post('/users')
            .send({
                "first_name": good_user_data[0].first_name,
                "last_name": good_user_data[0].last_name,
                "username": good_user_data[0].username
            })
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
                throw err
            });
    });

    it('Should return 400 status code: extra field', () => {
        return chai.request(SERVER_URL)
            .post('/users')
            .send({
                "first_name": good_user_data[0].first_name,
                "last_name": good_user_data[0].last_name,
                "username": good_user_data[0].username,
                "password": good_user_data[0].password,
                "extra": "field"
            })
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body).to.have.property('error_message')
            })
            .catch((err) => {
                throw err
            });
    });
})