'use strict';

describe('Controller: ProfilecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('hrmsApp'));

  var ProfilecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilecontrollerCtrl = $controller('ProfilecontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
