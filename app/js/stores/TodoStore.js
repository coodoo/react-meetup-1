/**
 * TodoStore
 */

//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/AppActionCreator');

var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

//========================================================================
//
// Private vars

// 等同於 TodoStore extends EventEmitter 
// 從此取得廣播的能力
// 由於將來會返還 TodoStore 出去，因此下面寫的會全變為 public methods
var Store = new EventEmitter();

// 假資料
var arrTodos = null;

// 目前選取的 todo 項目
var selectedItem = null;

// header 裏隨打即查輸入的文字
var searchFilter = '';

// app 第一次啟動時，存入一包 mock data 到 localStorage 供測試
var db = window.localStorage;
if( db.hasOwnProperty('mydb') == false ){
    // console.log( '\n無歷史資料，存入 mock data' );
    db.setItem('mydb', JSON.stringify({todos: [], selectedItem: null}) )
}

// 接著一律從 db 讀取歷史資料
var o = JSON.parse(db.getItem('mydb'));
arrTodos = o.todos ? o.todos : [] ;
selectedItem = o.selectedItem;

//========================================================================
//
// Public API

/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
$.extend( Store, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getAll: function(){
        return {
            arrTodos: arrTodos,
            selectedItem: selectedItem,
            filter: searchFilter
        }
    },

    //
    noop: function(){}
});

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 * 並且取回 dispatchToken 供日後 async 操作用
 */
Store.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

    // evt .action 就是 view 當時廣播出來的整包物件
    // 它內含 actionType
    var action = evt.action;

    switch (action.actionType) {

        /**
         * 
         */
        case AppConstants.TODO_CREATE:

            arrTodos.push( action.item );

            // console.log( 'Store 新增: ', arrTodos );

            // 將新增的項目設為 selected，將來在 ui 裏會高亮與自動捲動
            selectedItem = action.item;

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 
         */
        case AppConstants.TODO_REMOVE:

            arrTodos = arrTodos.filter( function(item){
                return item != action.item;
            })

            // 如果當前選取的 item 被刪掉了，要記錄這個事實
            if( selectedItem == action.item ){
                selectedItem = null;
            }

            // console.log( 'Store 刪完: ', arrTodos );

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 
         */    
        case AppConstants.TODO_UPDATE:

            console.log( 'Store 更新: ', action.item );
            
            action.item.name = action.newVal;

            Store.emit( AppConstants.CHANGE_EVENT );

            persist();
                
            break;

        /**
         * 
         */    
        case AppConstants.TODO_SELECT:

            // console.log( 'Store 選取: ', action.item );

            // 選取同樣的 item 就不用處理下去了
            if( selectedItem != action.item ){
                selectedItem = action.item;
                Store.emit( AppConstants.CHANGE_EVENT );
                persist();
            }
                
            break;

        /**
         * 
         */    
        case AppConstants.TODO_FILTER:

            // console.log( 'Store 查詢: ', action.val );

            if( searchFilter != action.val ){
                searchFilter = action.val
                Store.emit( AppConstants.CHANGE_EVENT );
            }
                
            break;

        

        default:
            //
    }

})

//========================================================================
//
// private methods

/**
 * 將資料保存入 localStorage，下次開啟時取回
 */
function persist(){
    db.setItem('mydb', JSON.stringify({todos: arrTodos, selectedItem: selectedItem}) );
}

//
module.exports = Store;
