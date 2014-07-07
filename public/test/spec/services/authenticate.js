'use strict';

describe('Service: Authenticate', function () {

  // load the service's module
  beforeEach(module('hrmsApp'));

  // instantiate service
  var Authenticate;
  beforeEach(inject(function (_Authenticate_) {
    Authenticate = _Authenticate_;
  }));

  it('should do something', function () {
    expect(!!Authenticate).toBe(true);
  });

});
