/**
 * 
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Promise = require('es6-promise').Promise;

// 就是個單純的 hash table
// 因此下面所有指令皆可視為 Action static method
var AppActionCreators = {

    /**
     * ok
     * 
     * app 啟動後，第一次載入資料
     */
    load: function(){
		//        
    },

    createTodo: function( item ) {

        // 1. 廣播給 store 知道去 optimistic 更新 view
        AppDispatcher.handleViewAction({

            // type 是為了方便將來所有 Store 內部判斷是否要處理這個 action
            actionType: AppConstants.TODO_CREATE,

            // 這裏是真正要傳出去的值
            item: item
        });

        // 2. 接著操作 REST service 回存 db
        // 太早拿 doc store 會取到空值，因此改在這裏拿
        /*var DocumentStore = require('zoot/stores/DocumentStore');
        
        // 依 flux 新手法，調用 store method 幫忙生成新物件好返還 server
        var aFolder = DocumentStore.updateFolder( {folder: folder, newVal: newVal} );

        // 操作 DAO 保存資料，注意要先將 file 轉成 JSON 字串
        this.invokeService( 'updateFolder', deCircular(aFolder) )
        
        // 等所有 dao 的 async 操作完成，處理 result
        // 由於可能有多個 DAO 操作完畢，因此 result 會是 array
        .then( function( payload ){
            
            if( payload.length == 0 )
                return console.error( 'service 操作失敗' );

            // 現在 server 已建立正式 doc.uid，廣播給 Store 知道
            // 讓它內部依 doc.tid 將 server_uid 更新到 local_uid 內
            var result = payload[0];
            // dbg( 'updateFolder 成功 >tid: ', result.name );

        })

        .catch( function(err){
            dbg( '\tupdateFolder 失敗: ', err.stack );
        })*/
        
    },

    selectTodo: function( item ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_SELECT,
            item: item
        });
        
    },

    removeTodo: function( item ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_REMOVE,
            item: item
        });

    },

    updateTodo: function( item ) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.TODO_UPDATE,
            item: item
        });

    },

    // dummy
    noop: function(){}
};

module.exports = AppActionCreators;
