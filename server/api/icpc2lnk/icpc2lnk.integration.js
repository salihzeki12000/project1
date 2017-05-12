'use strict';

var app = require('../..');
import request from 'supertest';

var newIcpc2lnk;

describe('Icpc2lnk API:', function() {

  describe('GET /api/icpc2lnks', function() {
    var icpc2lnks;

    beforeEach(function(done) {
      request(app)
        .get('/api/icpc2lnks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          icpc2lnks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      icpc2lnks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/icpc2lnks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/icpc2lnks')
        .send({
          name: 'New Icpc2lnk',
          info: 'This is the brand new icpc2lnk!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIcpc2lnk = res.body;
          done();
        });
    });

    it('should respond with the newly created icpc2lnk', function() {
      newIcpc2lnk.name.should.equal('New Icpc2lnk');
      newIcpc2lnk.info.should.equal('This is the brand new icpc2lnk!!!');
    });

  });

  describe('GET /api/icpc2lnks/:id', function() {
    var icpc2lnk;

    beforeEach(function(done) {
      request(app)
        .get('/api/icpc2lnks/' + newIcpc2lnk._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          icpc2lnk = res.body;
          done();
        });
    });

    afterEach(function() {
      icpc2lnk = {};
    });

    it('should respond with the requested icpc2lnk', function() {
      icpc2lnk.name.should.equal('New Icpc2lnk');
      icpc2lnk.info.should.equal('This is the brand new icpc2lnk!!!');
    });

  });

  describe('PUT /api/icpc2lnks/:id', function() {
    var updatedIcpc2lnk;

    beforeEach(function(done) {
      request(app)
        .put('/api/icpc2lnks/' + newIcpc2lnk._id)
        .send({
          name: 'Updated Icpc2lnk',
          info: 'This is the updated icpc2lnk!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIcpc2lnk = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIcpc2lnk = {};
    });

    it('should respond with the updated icpc2lnk', function() {
      updatedIcpc2lnk.name.should.equal('Updated Icpc2lnk');
      updatedIcpc2lnk.info.should.equal('This is the updated icpc2lnk!!!');
    });

  });

  describe('DELETE /api/icpc2lnks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/icpc2lnks/' + newIcpc2lnk._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when icpc2lnk does not exist', function(done) {
      request(app)
        .delete('/api/icpc2lnks/' + newIcpc2lnk._id)
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
