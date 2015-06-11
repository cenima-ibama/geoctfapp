'use strict';

describe('Directive: resizable', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resizable></resizable>');
    element = $compile(element)(scope);
  }));
});
