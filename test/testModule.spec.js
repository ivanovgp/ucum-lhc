/**
 * Mocha tests for the built module available as a bower task.  It tests the
 * unit expression validation and conversion functions at the top level only.
 *
 * Run from the command line with 'mocha testmodule.spec.js' or 'grunt test'
 */

var assert = require('assert');
var Utils = require("../source-es5/ucumLhcUtils.js").UcumLhcUtils;

var utils = Utils.getInstance();

describe('Validate_m2/g4', function() {
  describe('Validation Return Object', function() {
    var returnObj = utils.validateUnitString('m2/g4');
    it("should return status of valid", function() {
      assert.equal(returnObj['status'], 'valid');
    });
    it("should return a ucumCode = m2/g4", function() {
      assert.equal(returnObj['ucumCode'], "m2/g4");
    });
    it("should return empty message array", function() {
      assert.equal(returnObj['msg'].length, 0);
    });
  });
});

describe('Validate_m2/acr', function() {
  describe('Validation Return Object', function() {
    var returnObj = utils.validateUnitString('m2/acr');
    it("should return status = invalid", function() {
      assert.equal(returnObj['status'], "invalid");
    });
    it("should return a null ucumCode", function() {
      assert.equal(returnObj['ucumCode'], null);
    });
    it("should return error message = m2/acr is not a valid unit expression.", function() {
      assert.equal(returnObj['msg'][0], "acr is not a valid UCUM code.");
    });
  });
});

describe('Convert fathoms to inches', function() {
  describe('Conversion Return Object', function() {
    var returnObj = utils.convertUnitTo('[fth_us]', 27, '[in_us]');
    it("should return status = succeeded", function() {
      assert.equal(returnObj['status'], 'succeeded');
    });
    it("should return toVal = 1943.9999999999998", function() {
      assert.equal(returnObj['toVal'], 1943.9999999999998);
    });
    it("should return an empty msg array", function() {
      assert.equal(returnObj['msg'].length, 0);
    }) ;
    it("should return a fromUnit object with name = fathom - US", function() {
      assert.equal(returnObj['fromUnit'].name_, 'fathom - US');
    }) ;
    it("should return a toUnit object with name = inch - US", function() {
      assert.equal(returnObj['toUnit'].name_, 'inch - US');
    })
  });
});

describe('Convert fathoms to bars', function() {
  describe('Conversion Return Object', function() {
    var returnObj = utils.convertUnitTo('[fth_us]', 27, 'bar');
    it("should return status = failed", function() {
      assert.equal(returnObj['status'], 'failed');
    });
    it("should return toVal = null", function() {
      assert.equal(returnObj['toVal'], null);
    });
    it("should return msg = Sorry.  [fth_us] cannot be converted to bar.", function() {
      assert.equal(returnObj['msg'][0],
                   "Sorry.  [fth_us] cannot be converted to bar.");
    });
    it("should return a null fromUnit value", function() {
      assert.equal(returnObj['fromUnit'], null);
    }) ;
    it("should return a null toUnit value", function() {
      assert.equal(returnObj['toUnit'], null);
    })
  });
});

describe('Convert fathoms to acrs', function() {
  describe('Conversion Return Object', function() {
    var returnObj = utils.convertUnitTo('[fth_us]', 27, 'acr');
    it("should return status = failed", function() {
      assert.equal(returnObj['status'], 'failed', "status = " +
                   returnObj['status'] ? `${returnObj['status']}` : 'null');
    });
    it("should return toVal = null", function() {
      assert.equal(returnObj['toVal'], null, "toVal = " +
                   returnObj['toVal'] ? `${returnObj['toVal']}` : 'null');
    });
    it("should return error message = acr is not a valid unit code.", function() {
      assert.equal(2, returnObj['msg'].length);
      assert.equal("acr is not a valid UCUM code.",
                   returnObj['msg'][0], "msg = " + returnObj['msg']?
                   `${returnObj['msg'][0]}` : 'null');
      assert.equal("Unable to find a unit for acr, so no conversion could be " +
                   "performed.", returnObj['msg'][1],
                   "msg = " + returnObj['msg']? `${returnObj['msg'][1]}` : 'null');
    });
    it("should return a null fromUnit value", function() {
      assert.equal(returnObj['fromUnit'], null, "fromUnit = " +
                   returnObj['fromUnit'] ?
                   `${JSON.stringify(returnObj['fromUnit'])}` : 'null');
    }) ;
    it("should return a null toUnit value", function() {
      assert.equal(returnObj['toUnit'], null, "toUnit = " +
                   returnObj['toUnit'] ?
                   `${JSON.stringify(returnObj['toUnit'])}` : 'null');
    })
  });
});
