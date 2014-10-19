/**
 *
 */

var React = require('react');
var actions = require('../actions/AppActionCreator');

var Header = React.createClass({

  /**
   * 
   */
  render: function() {


    return (
      
      <header className="header">
        
        <p className="logo">Todo for Dummies</p>
       //Shoule defaultValue be placeholder ?" 
        <input className="search-box right" type="text" defaultValue="search here" />

      </header>
    );
  
  },

  noop: function(){

  }

});

module.exports = Header;
