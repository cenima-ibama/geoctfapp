'use strict';

describe('Directive: empresas', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<empresas></empresas>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the empresas directive');
  }));
});
