'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lookupCtrlStub = {
  index: 'lookupCtrl.index',
  show: 'lookupCtrl.show',
  create: 'lookupCtrl.create',
  update: 'lookupCtrl.update',
  destroy: 'lookupCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var lookupIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lookup.controller': lookupCtrlStub
});

describe('Lookup API Router:', function() {

  it('should return an express router instance', function() {
    lookupIndex.should.equal(routerStub);
  });

  describe('GET /api/lookups', function() {

    it('should route to lookup.controller.index', function() {
      routerStub.get
        .withArgs('/', 'lookupCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/lookups/:id', function() {

    it('should route to lookup.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'lookupCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/lookups', function() {

    it('should route to lookup.controller.create', function() {
      routerStub.post
        .withArgs('/', 'lookupCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/lookups/:id', function() {

    it('should route to lookup.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'lookupCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/lookups/:id', function() {

    it('should route to lookup.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'lookupCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/lookups/:id', function() {

    it('should route to lookup.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'lookupCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
