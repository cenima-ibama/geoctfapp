'use strict';

describe('Directive: cloro', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cloro></cloro>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cloro directive');
  }));
});
