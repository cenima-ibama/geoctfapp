'use strict';

describe('Directive: chart2', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chart2></chart2>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chart2 directive');
  }));
});
