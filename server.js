/**
 * Created by lidy on 2015/12/9.
 */
var express = require('express');

var port = parseInt(process.argv.pop());
var app = express();
app.configure(function() {
    app.use(express.bodyParser());
    app.use(app.router);
});

app.engine('jshtml', require('jshtml-express'));
app.set('view engine', 'jshtml');


app.get('/', function(req, res) {
    res.locals({
        title : 'Test!'
        , message : 'De groeten'
    });

    res.render('index');
});

app.listen(port);
console.log('helloworld running at port ' + port);