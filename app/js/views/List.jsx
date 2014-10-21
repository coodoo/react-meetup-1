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
   * 新增的 item 會在 list 最底部，有可能超出捲動範圍而看不到，
   * 因此要自動往下捲使其可視
   * 但同時也要避免一般的點選行為出現亂跳現象，因此要精準判斷該物件是否需要被捲動
   */
  componentDidUpdate: function(){

      // 下面都是在操作 DOM api，因此一開始就不用 jquery 選取，會便宜一些
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
    var filterStr = this.props.truth.filter;

    // 接著針對 arr 做 filter() 與 map() 兩段處理
    var arr = arrTodos

    // 先依隨打即查關鍵字過濾
    .filter(function(item){
        return item.name.indexOf(filterStr) != -1;
    })

    // 再將合格的項目轉成 <ListItem> 元件供顯示
    .map(function(item){

        //
        return <ListItem 

                todoItem={item}
                selected={this.props.truth.selectedItem && this.props.truth.selectedItem.uid == item.uid} 
                key={item.uid}

                onClick={this.handleClick.bind(this, item)}
                onRemove={this.handleRemove} />
          
    }, this)

    // 當上面這段跑完時，arr[] 的內容會就是一包 <ListItem> 元件
    // 下面就可直接使用

    return (
      
      <div className="todo-list">
          {arr}
      </div>
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
      actions.removeTodo(item);
  },  

  //
  noop: function(){}

});

module.exports = comp;