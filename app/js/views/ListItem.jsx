/**
 *
 */
var actions = require('../actions/AppActionCreator');
var cx = React.addons.classSet;

/**
 * 
 */
var comp = React.createClass({

  /**
   * didMount 代表 react 元件已出現在 DOM 上，
   * 預先將後面常用到的 elem 選出來存著，避免將來重覆選取
   */
  componentDidMount: function(){
      this.$input = $(this.getDOMNode()).find('span').first();
      this.$remove = this.$input.next();
  },

  /**
   * 
   */
  render: function() {
    
    // 這裏使用 react class add-on 來切換樣式顯示
    // 這樣做比較有條理，比直接組合多個字串來的好控制  
    var classes = cx({
        'list-item': true,
        'selected': this.props.selected
    });

    return (
      
      <div className={classes}

           onMouseOver={this.handleMouseMovement}
      
           onMouseOut={this.handleMouseMovement}
      
           onDoubleClick={this.handleDblClick} 
      
           onClick={this.props.onClick} >
          
          <span>{this.props.todoItem.name}</span>
          
          <span className="glyphicon glyphicon-remove right hide" 
                onClick={this.handleRemove} ></span>

      </div>
    );
  
  },

  /**
   * 在 listItem 上雙響時要切換為編輯模式
   * 手法是加上 contenteditable 屬性
   * 這也代表只支援 modern browsers
   */
  handleDblClick: function(){
      
      var val = null;

      // 加上這屬性就可編輯元件
      this.$input.attr('contenteditable', true);

      // 將 I-beam 放到文字最後方
      this.setCaret();

      // 編輯結束後的處理流程
      this.$input.on('keydown focusout', function(evt){
          
          // enter key 或 文字框喪失focus 事件發生，即認定為退出編輯狀態
          if( evt.keyCode == 13 || evt.type == 'focusout' ){
              
              evt.preventDefault();
              
              // 取得編輯後的新值
              val = this.$input.text();
              
              // 移除 <span> 的編輯能力  
              this.$input.removeAttr('contenteditable');
              // 也解掉掛的偵聽
              this.$input.off('keydown focusout');
              
              // 準備將新值存入 store，方法一樣是操作 actionCreator
              // this.props.todoItem.name = val;
              actions.updateTodo( this.props.todoItem, val );

          }
      }.bind(this))
  },  

  /**
   * util: 設定 I-beam 位置
   */
  setCaret: function() {
      var el = this.$input[0];
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el.childNodes[0], el.innerText.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
  },


  /**
   * ListItem 內部預先處理過刪除事件
   */
  handleRemove: function(evt){

    // 停止此事件繼續向上廣播，不然會連帶觸發另個 onClick 事件
    evt.stopPropagation();

    // 如果外界有傳入 onRemove handler，就觸發它，並且將自已身份也傳出去，方便外界識別與處理
    if( this.props.onRemove ){
        this.props.onRemove(this.props.todoItem);
    }

  },

  /**
   * 滑鼠移到一個 item 時要顯示 ✖ 鈕供刪除
   * 並且滑鼠移開時要隱藏
   */
  handleMouseMovement: function(evt){
      if( evt.type == 'mouseover'){
          this.$remove.removeClass('hide')
      }else{
          this.$remove.addClass('hide')
      }
  },

  noop: function(){}

});

module.exports = comp;