"use strict";

/**
 * This file contains the javascript used by the conversions test page index.html
 */
/**
 *  The unit tables object
 */
Ucum.unitTables_ = null;

/**
 *  The prefix tables object
 */
Ucum.prefixTables_ = null;

/**
 *  The list of unit names
 */
Ucum.unitNames_ = null;

/**
 *  The Functions object
 */
Ucum.functions_ = null;

/*
 * This includes general functions, such as initialization steps
 */
Ucum.init = function () {

  Ucum.functions_ = new Functions();

  // create the UnitTables singleton
  Ucum.unitTables_ = new UnitTables();

  // Load the input data into the unit tables
  new UnitsInput();

  // create the array of unit names
  Ucum.unitNames_ = Ucum.unitTables_.getAllUnitNames();
};

Ucum.doConversion = function () {
  var fromName = document.getElementById("convertFrom").value;
  // I am using parseFloat here because using parseInt cuts down 12.2222222 ...
  var fromMag = parseFloat(document.getElementById("convertNum").value);
  var toName = document.getElementById("convertTo").value;
  // create a from unit
  var fromUnit = Ucum.unitTables_.getUnitByName(fromName);
  var toUnit = Ucum.unitTables_.getUnitByName(toName);

  // call Unit.convertFrom on it
  var toMag = toUnit.convertFrom(fromMag, fromUnit);

  var resultString = document.getElementById("resultString");
  resultString.innerHTML = fromMag.toString() + " " + fromName + " units = " + toMag.toString() + " " + toName + " units";

  // put result on page
}; // end doConversion