/**
 * 
 */
var shortId = require('shortid');
var actions = require('../actions/AppActionCreator');

/**
 * 
 */
var comp = React.createClass({

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
               
               placeholder="輸入待辦事項" 
               
               onKeyDown={this.handleKeyDown} />

        <button className="save-button right" onClick={this.handleSave}>Save</button>

      </div>
    );
  
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

      var val = this.$input.val();  

      // 未輸入文字的話就擋掉
      if( val.trim().length == 0 ) return;

      var item = {};
      item.name = val;
      item.uid = shortId.generate();
      item.created = Date.now();

      actions.createTodo( item );

      // 清空輸入框，等待下一次的輸入
      this.$input.val('');
  },

  noop: function(){}

});

module.exports = comp;