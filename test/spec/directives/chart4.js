'use strict';

describe('Directive: chart4', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chart4></chart4>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chart4 directive');
  }));
});
