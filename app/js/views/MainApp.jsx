/**
 * 這是 root view，也稱為 controller-view
 */


//========================================================================
//
// import 

// var React = require('react');
var Header = React.createFactory( require('./Header.jsx') );
var Footer = React.createFactory( require('./Footer.jsx') );
var InputBox = React.createFactory( require('./InputBox.jsx') );
var List = React.createFactory( require('./List.jsx') );

var TodoStore = require('../stores/TodoStore');
var AppConstants = require('../constants/AppConstants');


//========================================================================
//
// Component

var MainApp = React.createClass({

    //========================================================================
    //
    // mixin | props | default value

    mixins: [],

    // 這裏列出所有要用到的 property 與其預設值
    // 它在 getInitialState() 前執行，此時 this.state 還是空值
    getDefaultProps: function() {
        return {
            // foo: '__foo__',
            // bar: '__bar__'
        };
    },

    // 這裏列出每個 prop 的型別，但只會在 dev time 檢查
    propTypes: {
        // foo: React.PropTypes.array,
        // bar: React.PropTypes.bool
    },


    //========================================================================
    //
    // mount
    
    // 這是 component API, 在 mount 前會跑一次，取值做為 this.state 的預設值
    getInitialState: function() {
        return this.getTruth();
    },

    /**
     * 主程式進入點
     */
    componentWillMount: function() {
        TodoStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
    },

    // 重要：root view 建立後第一件事，就是偵聽 store 的 change 事件
    componentDidMount: function() {
        //
    },  

    //========================================================================
    //
    // unmount

    componentWillUnmount: function() {
        
        //TodoStore.removeChangeListener(this._onChange);

    },


    componentDidUnmount: function() {
    },

    //========================================================================
    //
    // update

    // 在 render() 前執行，有機會可先處理 props 後用 setState() 存起來
    componentWillReceiveProps: function(nextProps) {
        //
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },

    // 這時已不可用 setState()
    componentWillUpdate: function(nextProps, nextState) {
        console.log( '\tMainAPP > willUpdate' );
    },

    /**
     * 
     */
    componentDidUpdate: function(prevProps, prevState) {
        console.log( '\tMainAPP > didUpdate' );
    },

    //========================================================================
    //
    // render

    render: function() {

        console.log( '\tMainApp > render' );

        return (
            
            <div className="wrapper">
                
                <Header />
                
                <div className="main-box">
                    <InputBox truth={this.state} />
                    <List truth={this.state} />
                </div>
                
                <Footer />
            </div>    
        )
    },



    //========================================================================
    //
    // private methods - 處理元件內部的事件

    /**
     * Event handler for 'change' events coming from the TodoStore
     *
     * controller-view 偵聽到 model change 後
     * 執行這支，它操作另一支 private method 去跟 model 取最新值
     * 然後操作 component life cycle 的 setState() 將新值灌入元件體系
     * 就會觸發一連串 child components 跟著重繪囉
     */
    _onChange: function(){

        console.log( '_onChange 重繪: ', this.getTruth() );
      
        // 重要：從 root view 觸發所有 sub-view 重繪
        this.setState( this.getTruth() );
    },

    /**
     * 為何要獨立寫一支？因為會有兩個地方會用到，因此抽出來
     * 目地：
     *     向各個 store 取回資料，然後統一 setState() 再一層層往下傳遞
     */
    getTruth: function() {

        // 是從 TodoStore 取資料(as the single source of truth)
        return { 
            arrTodos: TodoStore.getTodos(),
            selectedItem: TodoStore.getSelectedItem()
         };
    }


});

module.exports = MainApp;
