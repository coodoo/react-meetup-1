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
var Detail = React.createFactory( require('./Detail.jsx') );

var TodoStore = require('../stores/TodoStore');
var AppConstants = require('../constants/AppConstants');

var idResize;

/**
 * 
 */
var MainApp = React.createClass({

    //========================================================================
    //
    // mount
    
    /**
     * 這是 component API, 在 mount 前會跑一次，取值做為 this.state 的預設值
     */
    getInitialState: function() {
        var o = this.getTruth(); 
        o.screenSize = 'tablet'
        return o;
    },

    /**
     * 主程式進入點
     */
    componentWillMount: function() {
        TodoStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );

        // 要用 interval 擋一下
        window.addEventListener('resize', this.handleResize );

        this.handleResize();
    },

    handleResize: function(evt){
            
        clearTimeout( idResize );

        idResize = setTimeout(function(){
        
            var body = document.body;
            var size;
            
            // @todo: 改回 1024
            if(body.scrollWidth > 720){
                size = 'desktop';
            }else if(body.scrollWidth > 480){
                size = 'tablet';
            }else{
                size = 'phone';
            }
            
            // console.log( 'resize: ', body.scrollWidth, body.scrollHeight, ' >size: ', size );

            this.setState({screenSize: size});

        }.bind(this), 0)

    },

    /**
     * 重要：root view 建立後第一件事，就是偵聽 store 的 change 事件
     */
    componentDidMount: function() {
        //
    },  

    //========================================================================
    //
    // unmount

    /**
     * 元件將從畫面上移除時，要做善後工作
     */
    componentWillUnmount: function() {
        TodoStore.removeChangeListener( this._onChange );
    },

    /**
     * 
     */
    componentDidUnmount: function() {
        //
    },

    //========================================================================
    //
    // update

    /**
     * 在 render() 前執行，有機會可先處理 props 後用 setState() 存起來
     */
    componentWillReceiveProps: function(nextProps) {
        //
    },

    /**
     * 
     */
    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },

    // 這時已不可用 setState()
    componentWillUpdate: function(nextProps, nextState) {
    },

    /**
     * 
     */
    componentDidUpdate: function(prevProps, prevState) {
    },

    //========================================================================
    //
    // render

    /**
     * 
     */
    render: function() {

        var size = this.state.screenSize;
        // console.log( 'size: ', size );

        if( size == 'phone' ){

            // phone
            return (
                
                <div className="wrapper">
                    
                    <Header truth={this.state} />
                    
                    <div className="main-box">
                        <InputBox truth={this.state} />
                        <List truth={this.state} />
                    </div>
                    
                    <Footer />
                </div>    
            )

        }else if( size == 'tablet'){

            // tablet
            return (
                
                <div className="wrapper">
                    
                    <Header truth={this.state} />
                    
                    <div className="main-box">
                        <InputBox truth={this.state} />
                        <List truth={this.state} />
                    </div>
                    
                    <Footer />
                </div>    
            )
        
        }else{
            
            // desktop
            return (
                
                <div className="wrapper">
                    
                    <Header truth={this.state} />
                    
                    <div className="main-box">
                        <InputBox truth={this.state} />
                        <List truth={this.state} />
                        <Detail truth={this.state} />
                    </div>
                    
                    <Footer />
                </div>    
            )
        }
    },



    //========================================================================
    //
    // private methods - 處理元件內部的事件

    /**
     * controller-view 偵聽到 model change 後
     * 執行這支，它操作另一支 private method 去跟 model 取最新值
     * 然後操作 component life cycle 的 setState() 將新值灌入元件體系
     * 就會觸發一連串 child components 跟著重繪
     */
    _onChange: function(){
        // 重要：從 root view 觸發所有 sub-view 重繪
        this.setState( this.getTruth() );
    },

    /**
     * 為何要獨立寫一支？因為會有兩個地方會用到，因此抽出來
     * 目地：向各個 store 取回資料，然後統一 setState() 再一層層往下傳遞
     */
    getTruth: function() {
        // 是從 TodoStore 取資料(as the single source of truth)
        return TodoStore.getAll();
    }


});

module.exports = MainApp;
