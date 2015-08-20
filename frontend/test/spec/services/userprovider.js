'use strict';

describe('Service: UserProvider', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var UserProvider;
  beforeEach(inject(function (_UserProvider_) {
    UserProvider = _UserProvider_;
  }));

  it('should do something', function () {
    expect(!!UserProvider).toBe(true);
  });

});
