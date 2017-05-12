'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var icpc2lnkCtrlStub = {
  index: 'icpc2lnkCtrl.index',
  show: 'icpc2lnkCtrl.show',
  create: 'icpc2lnkCtrl.create',
  update: 'icpc2lnkCtrl.update',
  destroy: 'icpc2lnkCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var icpc2lnkIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './icpc2lnk.controller': icpc2lnkCtrlStub
});

describe('Icpc2lnk API Router:', function() {

  it('should return an express router instance', function() {
    icpc2lnkIndex.should.equal(routerStub);
  });

  describe('GET /api/icpc2lnks', function() {

    it('should route to icpc2lnk.controller.index', function() {
      routerStub.get
        .withArgs('/', 'icpc2lnkCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/icpc2lnks/:id', function() {

    it('should route to icpc2lnk.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'icpc2lnkCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/icpc2lnks', function() {

    it('should route to icpc2lnk.controller.create', function() {
      routerStub.post
        .withArgs('/', 'icpc2lnkCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/icpc2lnks/:id', function() {

    it('should route to icpc2lnk.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'icpc2lnkCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/icpc2lnks/:id', function() {

    it('should route to icpc2lnk.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'icpc2lnkCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/icpc2lnks/:id', function() {

    it('should route to icpc2lnk.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'icpc2lnkCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
