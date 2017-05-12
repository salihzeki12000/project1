'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var icpc2trmCtrlStub = {
  index: 'icpc2trmCtrl.index',
  show: 'icpc2trmCtrl.show',
  create: 'icpc2trmCtrl.create',
  update: 'icpc2trmCtrl.update',
  destroy: 'icpc2trmCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var icpc2trmIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './icpc2trm.controller': icpc2trmCtrlStub
});

describe('Icpc2trm API Router:', function() {

  it('should return an express router instance', function() {
    icpc2trmIndex.should.equal(routerStub);
  });

  describe('GET /api/icpc2trms', function() {

    it('should route to icpc2trm.controller.index', function() {
      routerStub.get
        .withArgs('/', 'icpc2trmCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/icpc2trms/:id', function() {

    it('should route to icpc2trm.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'icpc2trmCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/icpc2trms', function() {

    it('should route to icpc2trm.controller.create', function() {
      routerStub.post
        .withArgs('/', 'icpc2trmCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/icpc2trms/:id', function() {

    it('should route to icpc2trm.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'icpc2trmCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/icpc2trms/:id', function() {

    it('should route to icpc2trm.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'icpc2trmCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/icpc2trms/:id', function() {

    it('should route to icpc2trm.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'icpc2trmCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
