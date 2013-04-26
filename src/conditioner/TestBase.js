
/**
 * @exports TestBase
 * @constructor
 * @param {object} expected - expected conditions to be met
 * @param {element} [element] - optional element to measure these conditions on
 * @abstract
 */
var TestBase = function(expected,element) {

    // store expected value
    this._expected = expected;

    // store element
    this._element = element;

    // set default state
    this._state = true;

};

TestBase.inherit = function() {
    var T = function(expected,element) {
        TestBase.call(this,expected,element);
    };
    T.prototype = Object.create(TestBase.prototype);
    return T;
};

/**
 * Called to run the test
 * @param {string} expected - expected value
 * @private
 */
TestBase.prototype._test = function(expected) {

    // override in subclass

};

/**
 * Called to setup the test
 */
TestBase.prototype.arrange = function() {

    // override in subclass

};

/**
 * @fires change
 * @public
 */
TestBase.prototype.assert = function() {

    // call test
    var state = this._test(this._expected);

    // check if result changed
    if (this._state !== state) {
        this._state = state;
        Observer.publish(this,'change',state);
    }

};

/**
 * @returns {boolean}
 * @public
 */
TestBase.prototype.succeeds = function() {
    return this._state;
};
