'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var icpc2keyCtrlStub = {
  index: 'icpc2keyCtrl.index',
  show: 'icpc2keyCtrl.show',
  create: 'icpc2keyCtrl.create',
  update: 'icpc2keyCtrl.update',
  destroy: 'icpc2keyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var icpc2keyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './icpc2key.controller': icpc2keyCtrlStub
});

describe('Icpc2key API Router:', function() {

  it('should return an express router instance', function() {
    icpc2keyIndex.should.equal(routerStub);
  });

  describe('GET /api/icpc2keys', function() {

    it('should route to icpc2key.controller.index', function() {
      routerStub.get
        .withArgs('/', 'icpc2keyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/icpc2keys/:id', function() {

    it('should route to icpc2key.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'icpc2keyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/icpc2keys', function() {

    it('should route to icpc2key.controller.create', function() {
      routerStub.post
        .withArgs('/', 'icpc2keyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/icpc2keys/:id', function() {

    it('should route to icpc2key.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'icpc2keyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/icpc2keys/:id', function() {

    it('should route to icpc2key.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'icpc2keyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/icpc2keys/:id', function() {

    it('should route to icpc2key.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'icpc2keyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
