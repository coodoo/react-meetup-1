/**
 *
 */

var actions = require('../actions/AppActionCreator');
var ListItem = React.createFactory(require('./ListItem.jsx'));

//
var comp = React.createClass({

  /**
   * 新增的 item 會在 list 最底部，有可能超出捲動範圍而看不到，
   * 因此要自動往下捲使其可視
   * 但同時也要避免一般的點選行為出現亂跳現象，因此要精準判斷該物件是否需要被捲動
   */
  componentDidUpdate: function(){

      var elem = document.querySelector('.todo-list .selected');

      // 當前沒有選取任何項目就不繼續了
      if(!elem) return;

      var parent = elem.parentElement;

      // 10 是安全區間，避免有時判斷失靈導致該顯示而沒捲動
      if( elem.getBoundingClientRect().top - parent.getBoundingClientRect().bottom > -10 ){
          elem.scrollIntoView();
      }

  },

  /**
   * 
   */
  render: function() {

    var arrTodos = this.props.truth.arrTodos;
    var filter = this.props.truth.filter;

    var arr = arrTodos

    // 先依隨打即查關鍵字過濾
    .filter(function(item){
        return item.name.indexOf(filter) != -1;
    })

    // 再將合格的項目轉成 <ListItem> 元件供顯示
    .map(function(item){

        //
        return <ListItem 

                todoItem={item}
                selected={this.props.truth.selectedItem.uid == item.uid} 
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
      // console.log( '\n\nitem click: ', item.name );
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