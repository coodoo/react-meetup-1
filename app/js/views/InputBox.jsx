/**
 * 
 */
var shortId = require('shortid');
var actions = require('../actions/AppActionCreator');

var comp = React.createClass({

  /**
   * 
   */
  getInitialState: function() {
      return {
          currentItem: {name: '', uid: null, created: null}
      };
  },

  componentDidMount: function(){
      this.$input = $('#todo-input');
  },

  /**
   * supported events
   * http://facebook.github.io/react/docs/events.html
   */
  render: function() {

    return (
      
      <div className="input-box">
     
        <input id="todo-input" 
               className="search-input" 
               type="text" 
               
               value={this.state.currentItem.name}
               placeholder="輸入待辦事項" 
               
               onChange={this.handleChange}
               onKeyDown={this.handleKeyDown} />

        <button className="save-button right" onClick={this.handleSave}>Save</button>

      </div>
    );
  
  },

  /**
   * input 是 controlled component
   * 它的值是綁定在 this.state.currentItem 身上
   * 因此要在 change 時將新值設回 currentItem 內，才會顯示在畫面上
   */
  handleChange: function(evt){
      this.state.currentItem.name = evt.target.value;
      this.setState({currentItem: this.state.currentItem});
  },
  
  /**
   * 按下 enter 就存檔
   */  
  handleKeyDown: function(evt){
      if( evt.keyCode == 13){
          this.handleSave();
      }
  },

  /**
   * 按下 save 鈕就存檔
   */
  handleSave: function(evt){

      // console.log( 'save new item' );
      
      var item = this.state.currentItem;

      // 未輸入文字的話就擋掉
      if( item.name.trim().length == 0 ) return;

      item.uid = shortId.generate();
      item.created = Date.now();

      actions.createTodo( item );

      // 清空輸入框，等待下一次的輸入
      this.setState({currentItem: {name:'', uid: null, created: null}});
  },

  noop: function(){

  }

});

module.exports = comp;