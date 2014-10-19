/**
 *
 */

var React = require('react');
var actions = require('../actions/AppActionCreator');
var ListItem = require('./ListItem.jsx');

//
var comp = React.createClass({

  /**
   * 
   */
  render: function() {

    var arrTodos = this.props.truth.arrTodos;

    var arr = arrTodos.map(function(item){

        //
        return <ListItem 

                todoItem={item}
                selected={this.props.truth.selectedItem == item} 
                key={item.uid}

                onClick={this.handleClick.bind(this, item)}
                onRemove={this.handleRemove} />
          
    }, this)

    return (
      
      <div className="todo-list">
          {arr}
      </div>
    );
  
  },

  /**
   * 
   */
  handleClick: function( item ){
      console.log( '\n\nitem click: ', item.name );
      actions.selectTodo(item);
  },  

  /**
   * 
   */
  handleRemove: function( item ){
      console.log( '\n\nitem remove: ', item.name );
      actions.removeTodo(item);
  },  

  //
  noop: function(){

  }

});

module.exports = comp;