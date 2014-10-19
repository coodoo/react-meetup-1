/**
 *
 */
var actions = require('../actions/AppActionCreator');
var ListItem = React.createFactory(require('./ListItem.jsx'));

/**
 * 
 */
var comp = React.createClass({

  /**
   */
  componentDidUpdate: function(){


  },

  /**
   * 
   */
  render: function() {

    return (
      
      <form className="item-detail" role="form">
        
        <div className="form-group">
          <label htmlFor="todo-name">Name</label>
          <input id="todo-name" type="text" 
                 className="form-control" 
                 value={this.props.truth.selectedItem.name} 
                 onChange={this.noop}
                 placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label htmlFor="todo-date">Created Date</label>
          <input id="todo-date" type="text" 
                 className="form-control" 
                 value={this.props.truth.selectedItem.created}
                 onChange={this.noop}
                 placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label htmlFor="todo-date">ID</label>
          <p>{this.props.truth.selectedItem.uid}</p>
        </div>
        
        <button className="btn btn-default">Save</button>
      </form>

    );
  
  },

  /**
   * 大部份 ui 操作最終都是直接轉手給 actions 去處理
   */
  handleClick: function( item ){
      // console.log( '\n\nitem click: ', item.name );
      actions.selectTodo(item);
  },  

  /**
   * 
   */
  handleRemove: function( item ){
      // console.log( '\n\nitem remove: ', item.name );
      actions.removeTodo(item);
  },  

  //
  noop: function(){}

});

module.exports = comp;