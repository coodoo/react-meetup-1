/**
 * 
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Promise = require('es6-promise').Promise;

/**
 * 這是一個 singleton 物件
 */
var AppActionCreators = {

    /**
     * app 啟動後，第一次載入資料
     */
    load: function(){
		//        
    },

    /**
     * 
     */
    createTodo: function( item ) {

        // 1. 廣播給 store 知道去 optimistic 更新 view
        AppDispatcher.handleViewAction({

            // type 是為了方便將來所有 Store 內部判斷是否要處理這個 action
            actionType: AppConstants.TODO_CREATE,

            // 這裏是真正要傳出去的值
            item: item
        });

    },

    /**
     * 
     */
    selectTodo: function( item ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_SELECT,
            item: item
        });
        
    },

    /**
     * 
     */
    removeTodo: function( item ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_REMOVE,
            item: item
        });

    },

    /**
     * 
     */
    updateTodo: function( item, newVal ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_UPDATE,
            item: item, 
            newVal: newVal
        });

    },

    /**
     * 
     */
    doSearch: function( val ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_FILTER,
            val: val
        });

    },

    // dummy
    noop: function(){}
};

module.exports = AppActionCreators;
