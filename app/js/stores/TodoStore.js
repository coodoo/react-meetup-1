/**
 * TodoStore
 */

//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/AppActionCreator');

var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

//========================================================================
//
// Public API

// 等同於 TodoStore extends EventEmitter 
// 從此取得廣播的能力
// 由於將來會返還 TodoStore 出去，因此下面寫的會全變為 public methods
var Store = {};

// 該此的 global variable，不要學...
window.cnt = 1;

// 假資料
var arrTodos = [
    {name: '待辦事項 1', created: Date.now(), uid: cnt++},
    {name: '待辦事項 2', created: Date.now(), uid: cnt++}
];

// 目前選取的 todo 項目
var selectedItem = null;

/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
objectAssign( Store, EventEmitter.prototype, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getTodos: function(){
        return arrTodos;
    },

    /**
     * 
     */
    getSelectedItem: function(){
        return selectedItem;
    },

    //
    noop: function(){}
});

//========================================================================
//
// event handlers

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

            console.log( 'Store 新增: ', arrTodos );

            Store.emit( AppConstants.CHANGE_EVENT );
                
            break;

        /**
         * 
         */
        case AppConstants.TODO_REMOVE:

            arrTodos = arrTodos.filter( function(item){
                return item != action.item;
            })

            console.log( 'Store 刪完: ', arrTodos );

            Store.emit( AppConstants.CHANGE_EVENT );
                
            break;

        /**
         * 
         */    
        case AppConstants.TODO_UPDATE:

            console.log( 'Store 更新: ', arrTodos );

            Store.emit( AppConstants.CHANGE_EVENT );
                
            break;

        /**
         * 
         */    
        case AppConstants.TODO_SELECT:

            console.log( 'Store 選取: ', action.item );

            // 選取同樣的 item 就不用處理下去了
            if( selectedItem != action.item ){
                selectedItem = action.item;
                Store.emit( AppConstants.CHANGE_EVENT );
            }

                
            break;

        

        default:
            //
    }

})

//
module.exports = Store;
