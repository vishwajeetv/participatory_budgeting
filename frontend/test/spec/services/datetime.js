'use strict';

describe('Service: DateTime', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var DateTime;
  beforeEach(inject(function (_DateTime_) {
    DateTime = _DateTime_;
  }));

  it('should do something', function () {
    expect(!!DateTime).toBe(true);
  });

});
