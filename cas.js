var cassandra = require('cassandra-driver');
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'appcache'});
var query = 'select * from kvcache';

var resultset,last;

client.connect( function (err, db, req, res) {
    if (err) {
        console.log('Unable to connect to the Cassandra server. Error:', err);
    } else {
        console.log('Connection established to Cassandra cql : 127.0.0.1:9042');
    }
});

client.execute("select * from kvcache", function(err, result) {
    resultset = result;
});

app.get('/data', function ( req, res) {
    if( parseInt(req.query.cp) == 0 )
    {
        client.execute("select * from kvcache limit 2", function(err, result) {
            //console.log("cp = 0");
            res.send(result.rows);
            last = result.rows[1];
            //console.log(last);
        });
    }
    else
    {
        client.execute("select * from kvcache where token(appname) > token('"+last.appname+"') limit 2", function(err, result) {
            //console.log("cp = "+req.query.cp);
            //console.log("select * from kvcache where token(appname) > token('"+last.appnames+"') limit 2");
            res.send(result.rows);
            last = result.rows[1];
            //console.log(last);
        });
    }
});

app.get('/getlast', function (req, res) {
    last = req.query.last ;
    console.log(last);
});

app.get('/datacount', function ( req, res) {
    res.json(resultset.rowLength);
});

app.get('/', function ( req, res) {
    res.sendFile(path.join(__dirname, 'paging.html'));
});

var server = app.listen(5555, function() {
    console.log('Web is running...');
});
