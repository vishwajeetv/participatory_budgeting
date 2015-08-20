'use strict';

describe('Service: SuggestionProvider', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var SuggestionProvider;
  beforeEach(inject(function (_SuggestionProvider_) {
    SuggestionProvider = _SuggestionProvider_;
  }));

  it('should do something', function () {
    expect(!!SuggestionProvider).toBe(true);
  });

});
