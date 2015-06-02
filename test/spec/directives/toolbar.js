'use strict';

describe('Directive: toolbar', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<toolbar></toolbar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the toolbar directive');
  }));
});
