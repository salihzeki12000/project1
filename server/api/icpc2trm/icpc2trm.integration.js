'use strict';

var app = require('../..');
import request from 'supertest';

var newIcpc2trm;

describe('Icpc2trm API:', function() {

  describe('GET /api/icpc2trms', function() {
    var icpc2trms;

    beforeEach(function(done) {
      request(app)
        .get('/api/icpc2trms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          icpc2trms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      icpc2trms.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/icpc2trms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/icpc2trms')
        .send({
          name: 'New Icpc2trm',
          info: 'This is the brand new icpc2trm!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIcpc2trm = res.body;
          done();
        });
    });

    it('should respond with the newly created icpc2trm', function() {
      newIcpc2trm.name.should.equal('New Icpc2trm');
      newIcpc2trm.info.should.equal('This is the brand new icpc2trm!!!');
    });

  });

  describe('GET /api/icpc2trms/:id', function() {
    var icpc2trm;

    beforeEach(function(done) {
      request(app)
        .get('/api/icpc2trms/' + newIcpc2trm._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          icpc2trm = res.body;
          done();
        });
    });

    afterEach(function() {
      icpc2trm = {};
    });

    it('should respond with the requested icpc2trm', function() {
      icpc2trm.name.should.equal('New Icpc2trm');
      icpc2trm.info.should.equal('This is the brand new icpc2trm!!!');
    });

  });

  describe('PUT /api/icpc2trms/:id', function() {
    var updatedIcpc2trm;

    beforeEach(function(done) {
      request(app)
        .put('/api/icpc2trms/' + newIcpc2trm._id)
        .send({
          name: 'Updated Icpc2trm',
          info: 'This is the updated icpc2trm!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIcpc2trm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIcpc2trm = {};
    });

    it('should respond with the updated icpc2trm', function() {
      updatedIcpc2trm.name.should.equal('Updated Icpc2trm');
      updatedIcpc2trm.info.should.equal('This is the updated icpc2trm!!!');
    });

  });

  describe('DELETE /api/icpc2trms/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/icpc2trms/' + newIcpc2trm._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when icpc2trm does not exist', function(done) {
      request(app)
        .delete('/api/icpc2trms/' + newIcpc2trm._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
