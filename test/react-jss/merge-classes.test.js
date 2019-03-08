"use strict";

var _expect = _interopRequireDefault(require("expect.js"));

var _mergeClasses = _interopRequireDefault(require("./merge-classes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('react-jss: merge-classes', function () {
  it('should merge two class objects', function () {
    var staticClasses = {
      a: 'a',
      b: 'b'
    };
    var dynamicClasses = {
      b: 'b2',
      c: 'c'
    };
    var composed = (0, _mergeClasses.default)(staticClasses, dynamicClasses);
    (0, _expect.default)(composed).to.eql({
      a: 'a',
      b: 'b b2',
      c: 'c'
    });
  });
});