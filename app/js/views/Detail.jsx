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
   * 
   */
  getInitialState: function() {
      return {
          selectedItem: this.props.truth.selectedItem
      };
  },


  /**
   * 在 render() 前執行，有機會可先處理 props 後用 setState() 存起來
   */
  componentWillReceiveProps: function(nextProps) {
      this.setState({selectedItem: nextProps.truth.selectedItem})
  },

  /**
   * 
   */
  render: function() {

    var date = new Date(this.state.selectedItem.created).toLocaleString();

    return (
      
      <form className="item-detail" role="form">
        
        <div className="form-group">
          <label htmlFor="todo-name">Name</label>
          <input id="todo-name" type="text" 
                 className="form-control" 
                 value={this.state.selectedItem.name} 
                 onChange={this.handleChange.bind(this, 'name')}
                 placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label htmlFor="todo-date">Created Date</label>
          <p>{ new Date(this.state.selectedItem.created) + '' }</p>
        </div>

        <div className="form-group">
          <label htmlFor="todo-date">ID</label>
          <p>{this.state.selectedItem.uid}</p>
        </div>
        
        <button className="btn btn-default" 
                onClick={this.handleClick}>Save</button>
      </form>

    );
  
  },

  /**
   * 大部份 ui 操作最終都是直接轉手給 actions 去處理
   */
  handleClick: function( evt ){
      evt.preventDefault();
      // console.log( '\n\nsave button click: ', this.state.selectedItem.name );
      actions.updateTodo(this.state.selectedItem, this.state.selectedItem.name);
  },  


  /**
   * 
   */
  handleChange: function(field, evt){
      this.state.selectedItem[field] = evt.target.value;
      this.setState( {selectedItem: this.state.selectedItem} );
  },

  //
  noop: function(){
      console.log( 'd: ', new Date(this.state.selectedItem.created) );
  }

});

module.exports = comp;