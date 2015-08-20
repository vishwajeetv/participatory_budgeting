'use strict';

describe('Service: InstanceProvider', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var InstanceProvider;
  beforeEach(inject(function (_InstanceProvider_) {
    InstanceProvider = _InstanceProvider_;
  }));

  it('should do something', function () {
    expect(!!InstanceProvider).toBe(true);
  });

});
