'use strict';

describe('Airport', function() {
  var airport;
  var plane;
  beforeEach(function() {
    airport = new Airport();
    plane = jasmine.createSpyObj('plane',['land']);
  });

  it('starts with no planes', function() {
    expect(airport.planes()).toEqual([]);
  });

  it('can clear planes for landing', function(){
    airport.clearForLanding(plane);
    expect(airport.planes()).toEqual([plane]);
  });

  it('it can clear planes for takeoff', function() {
    airport.clearForLanding(plane);
    airport.clearForTakeOff(plane);
    expect(airport.planes()).toEqual([]);
  });

  it('can check for stormy condition', function() {
    expect(airport.isStormy()).toBeFalsy();
  });

  describe('under stormy conditions', function() {
    it('it does not clear planes for takeoff', function() {
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function() { airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff during storm');
    });

    it('it does not land planes' , function() {
      spyOn(airport, 'isStormy').and.returnValue(true);
      expect(function () { airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
    });
  });
});
