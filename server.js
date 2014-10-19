var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    app;

// 建 server
app = connect()

// 指定供應 static file 的路徑
// request 進來，先去 static 目錄找，沒有符合的才進入下一個 middleware 
.use( connect.static('build') )

.use( function(req, res, next ){
	fs.readFile('./build/index.html', function(err, data){
		res.write(data);
		res.end();
	})
})

// 啟動 server 在 8000
http.createServer(app).listen(8000, function() {
    console.log('Running on http://localhost:8000');
});