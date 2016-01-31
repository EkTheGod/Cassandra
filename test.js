var cassandra = require('cassandra-driver');
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var client,query;
var ks,tb;


app.get('/get', function ( req, res) {
    ks = req.query.Keyspace;
    tb = req.query.Table;
    client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: req.query.Keyspace});
    query = 'select * from '+req.query.Table;

    docql();

});

function docql(){

    client.connect( function (err, db, req, res) {
        if (err) {
            console.log('Unable to connect to the Cassandra server. Error:', err);
        } else {
            console.log('Connection established to Cassandra cql : 127.0.0.1:9042 Keyspace : '+ks+' Table : '+tb);
        }
    });

    client.execute( query, function(err, result) {
        if(result == undefined)
            console.log('Table not found');
        else
            console.log(result);
    });
}

app.get('/', function ( req, res) {
    res.sendFile(path.join(__dirname, 'test.html'));
});

var server = app.listen(5555, function() {
    console.log('Web is running...');
});
