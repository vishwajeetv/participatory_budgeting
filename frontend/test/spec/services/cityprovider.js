'use strict';

describe('Service: CityProvider', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var CityProvider;
  beforeEach(inject(function (_CityProvider_) {
    CityProvider = _CityProvider_;
  }));

  it('should do something', function () {
    expect(!!CityProvider).toBe(true);
  });

});
