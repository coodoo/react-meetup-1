/*
 * 這支是程式進入點，它負責建立 root view (controller view)，
 * 也就是 TodoApp 這個元件
 *
 * boot.js 存在的目地，是因為通常 app 啟動時有許多先期工作要完成，
 * 例如預載資料到 store 內、檢查本地端 db 狀態、切換不同語系字串、
 * 這些工作都先在 boot.js 內做完，再啟動 TodoApp view 建立畫面是比較好的
 * 
 */

// v0.12 開始要用 factory 包一次才能直接呼叫	
var MainApp = React.createFactory(require('./views/MainApp.jsx'));

$(function(){

	// 啟動 root view 時要傳入假資料
	React.render( MainApp(), document.getElementById('container') );

})
