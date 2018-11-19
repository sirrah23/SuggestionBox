process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let suggestionBox = require('../model/suggestionBox.js')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Suggestion Box', () => {

    beforeEach((done) => {
        suggestionBox.remove({}, (err) => { 
            done()
        })
    })

  describe('/GET suggestion box', () => {
    it('should GET all of the suggestion boxes', (done) => {
        chai.request(server)
            .get('/suggestionbox')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(0)
                done()
        }) })
})


    describe('/POST suggestionBox', () => {
        it('should POST a suggestionBox without suggestions', (done) => {
            const box = {
                name: "New menu items for cafeteria",
            }
            chai.request(server)
                .post('/suggestionBox')
                .send(box)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.not.have.property('error')
                    res.body.should.have.property('name')
                    res.body.should.have.property('date')
                    res.body.should.have.property('hash_owner')
                    res.body.should.have.property('hash_submitter')
                    res.body.should.have.property('suggestions')
                    done()
            })
        })
    })
})