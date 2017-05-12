'use strict';

var app = require('../..');
import request from 'supertest';

var newLookup;

describe('Lookup API:', function() {

  describe('GET /api/lookups', function() {
    var lookups;

    beforeEach(function(done) {
      request(app)
        .get('/api/lookups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lookups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      lookups.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/lookups', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lookups')
        .send({
          name: 'New Lookup',
          info: 'This is the brand new lookup!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLookup = res.body;
          done();
        });
    });

    it('should respond with the newly created lookup', function() {
      newLookup.name.should.equal('New Lookup');
      newLookup.info.should.equal('This is the brand new lookup!!!');
    });

  });

  describe('GET /api/lookups/:id', function() {
    var lookup;

    beforeEach(function(done) {
      request(app)
        .get('/api/lookups/' + newLookup._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lookup = res.body;
          done();
        });
    });

    afterEach(function() {
      lookup = {};
    });

    it('should respond with the requested lookup', function() {
      lookup.name.should.equal('New Lookup');
      lookup.info.should.equal('This is the brand new lookup!!!');
    });

  });

  describe('PUT /api/lookups/:id', function() {
    var updatedLookup;

    beforeEach(function(done) {
      request(app)
        .put('/api/lookups/' + newLookup._id)
        .send({
          name: 'Updated Lookup',
          info: 'This is the updated lookup!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLookup = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLookup = {};
    });

    it('should respond with the updated lookup', function() {
      updatedLookup.name.should.equal('Updated Lookup');
      updatedLookup.info.should.equal('This is the updated lookup!!!');
    });

  });

  describe('DELETE /api/lookups/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/lookups/' + newLookup._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when lookup does not exist', function(done) {
      request(app)
        .delete('/api/lookups/' + newLookup._id)
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
