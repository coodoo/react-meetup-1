/*!
 * react-mixin-manager v0.4.0
 * https://github.com/jhudson8/react-mixin-manager
 * 
 * 
 * Copyright (c) 2014 Joe Hudson<joehud_AT_gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 (function(main) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], main);
  } else if (typeof exports !== 'undefined' && typeof require !== 'undefined') {
    module.exports = function(React) {
      main(React);
    };
  } else {
    main(React);
  }
})(function(React) {

  /**
   * return the normalized mixin list
   * @param values {Array} list of mixin entries
   * @param index {Object} hash which contains a truthy value for all named mixins that have been added
   * @param rtn {Array} the normalized return array
   */
  function get(values, index, rtn) {

    /**
     * add the named mixin and all un-added dependencies to the return array
     * @param the mixin name
     */
    function addTo(name) {
      if (!index[name]) {
        var mixin = React.mixins._mixins[name],
            checkAgain = false;
        if (mixin) {
          if (typeof mixin === 'function') {
            mixin = mixin();
            checkAgain = true;
          }
          get(React.mixins._dependsOn[name], index, rtn);
          get(React.mixins._dependsInjected[name], index, rtn);

          index[name] = true;
          if (checkAgain) {
            get([mixin], index, rtn);
          } else {
            rtn.push(mixin);
          }
          
        } else {
          throw 'invalid mixin "' + name + '"';
        }
      }
    }

    function handleMixin(mixin) {
      if (mixin) {
        if (Array.isArray(mixin)) {
          // flatten it out
          get(mixin, index, rtn);
        } else if (typeof mixin === 'string') {
          // add the named mixin and all of it's dependencies
          addTo(mixin);
        } else {
          // just add the mixin normally
          rtn.push(mixin);
        }
      }
    }

    if (Array.isArray(values)) {
      for (var i=0; i<values.length; i++) {
        handleMixin(values[i]);
      }      
    } else {
      handleMixin(values);
    }
  }

  // allow for registered mixins to be extract just by using the standard React.createClass
  var _createClass = React.createClass;
  React.createClass = function(spec) {
    if (spec.mixins) {
      spec.mixins = React.mixins.get(spec.mixins);
    }
    return _createClass.apply(React, arguments);
  };

  function addMixin(name, mixin, depends, override) {
    var mixins = React.mixins;
    if (!override && mixins._mixins[name]) {
      return;
    }
    mixins._dependsOn[name] = depends.length && depends;
    mixins._mixins[name] = mixin;
  }

  function GROUP() {
    // empty function which is used only as a placeholder to list dependencies
  }

  React.mixins = {
    /**
     * return the normalized mixins.  there can be N arguments with each argument being
     * - an array: will be flattened out to the parent list of mixins
     * - a string: will match against any registered mixins and append the correct mixin
     * - an object: will be treated as a standard mixin and returned in the list of mixins
     * any string arguments that are provided will cause any dependent mixins to be included
     * in the return list as well
     */
    get: function() {
      var rtn = [],
          index = {};
      get(Array.prototype.slice.call(arguments), index, rtn);
      return rtn;
    },

    /**
     * Inject dependencies that were not originally defined when a mixin was registered
     * @param name {string} the main mixin name
     * @param (any additional) {string} dependencies that should be registered against the mixin
     */
    inject: function(name) {
      var l = this._dependsInjected[name];
      if (!l) {
        l = this._dependsInjected[name] = [];
      }
      l.push(Array.prototype.slice.call(arguments, 1));
    },

    alias: function(name) {
      addMixin(name, GROUP, Array.prototype.slice.call(arguments, 1), false);
    },

    add: function(name, mixin) {
      addMixin(name, mixin, Array.prototype.slice.call(arguments, 2), false);
    },

    replace: function(name, mixin) {
      addMixin(name, mixin, Array.prototype.slice.call(arguments, 2), true);
    },

    exists: function(name) {
      return this._mixins[name] || false;
    },

    _dependsOn: {},
    _dependsInjected: {},
    _mixins: {}
  };
});