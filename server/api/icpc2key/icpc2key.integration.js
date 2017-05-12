'use strict';

var app = require('../..');
import request from 'supertest';

var newIcpc2key;

describe('Icpc2key API:', function() {

  describe('GET /api/icpc2keys', function() {
    var icpc2keys;

    beforeEach(function(done) {
      request(app)
        .get('/api/icpc2keys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          icpc2keys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      icpc2keys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/icpc2keys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/icpc2keys')
        .send({
          name: 'New Icpc2key',
          info: 'This is the brand new icpc2key!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIcpc2key = res.body;
          done();
        });
    });

    it('should respond with the newly created icpc2key', function() {
      newIcpc2key.name.should.equal('New Icpc2key');
      newIcpc2key.info.should.equal('This is the brand new icpc2key!!!');
    });

  });

  describe('GET /api/icpc2keys/:id', function() {
    var icpc2key;

    beforeEach(function(done) {
      request(app)
        .get('/api/icpc2keys/' + newIcpc2key._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          icpc2key = res.body;
          done();
        });
    });

    afterEach(function() {
      icpc2key = {};
    });

    it('should respond with the requested icpc2key', function() {
      icpc2key.name.should.equal('New Icpc2key');
      icpc2key.info.should.equal('This is the brand new icpc2key!!!');
    });

  });

  describe('PUT /api/icpc2keys/:id', function() {
    var updatedIcpc2key;

    beforeEach(function(done) {
      request(app)
        .put('/api/icpc2keys/' + newIcpc2key._id)
        .send({
          name: 'Updated Icpc2key',
          info: 'This is the updated icpc2key!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIcpc2key = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIcpc2key = {};
    });

    it('should respond with the updated icpc2key', function() {
      updatedIcpc2key.name.should.equal('Updated Icpc2key');
      updatedIcpc2key.info.should.equal('This is the updated icpc2key!!!');
    });

  });

  describe('DELETE /api/icpc2keys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/icpc2keys/' + newIcpc2key._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when icpc2key does not exist', function(done) {
      request(app)
        .delete('/api/icpc2keys/' + newIcpc2key._id)
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
