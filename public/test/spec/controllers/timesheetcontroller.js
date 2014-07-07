'use strict';

describe('Controller: TimesheetcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('hrmsApp'));

  var TimesheetcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimesheetcontrollerCtrl = $controller('TimesheetcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
