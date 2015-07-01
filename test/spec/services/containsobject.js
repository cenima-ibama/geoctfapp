'use strict';

describe('Service: containsObject', function () {

  // load the service's module
  beforeEach(module('geoCtfApp'));

  // instantiate service
  var containsObject;
  beforeEach(inject(function (_containsObject_) {
    containsObject = _containsObject_;
  }));

  it('should do something', function () {
    expect(!!containsObject).toBe(true);
  });

});
