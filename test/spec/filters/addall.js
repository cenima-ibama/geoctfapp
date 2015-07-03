'use strict';

describe('Filter: addAll', function () {

  // load the filter's module
  beforeEach(module('geoCtfApp'));

  // initialize a new instance of the filter before each test
  var addAll;
  beforeEach(inject(function ($filter) {
    addAll = $filter('addAll');
  }));

  it('should return the input prefixed with "addAll filter:"', function () {
    var text = 'angularjs';
    expect(addAll(text)).toBe('addAll filter: ' + text);
  });

});
