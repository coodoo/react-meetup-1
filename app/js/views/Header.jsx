/**
 *
 */

var actions = require('../actions/AppActionCreator');

var Header = React.createClass({

  /**
   * 
   */
  render: function() {


    return (
      
      <header className="header">
        
        <p className="logo">Todo for Dummies</p>
        
        <input className="search-box right" 
               type="text" 
               onChange={this.handleChange}
               placeholder="search here" />

      </header>
    );
  
  },

  /**
   * 
   */
  handleChange: function(evt){
      var val = evt.target.value.trim();
      actions.doSearch(val);
  },

  noop: function(){

  }

});

module.exports = Header;