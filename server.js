var express = require('express');
var app = express();
var hb = require('express-handlebars');
app.use(express.static('./static'));
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
var db = require('./db');
var pg = require('pg');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false }
));


// app.use(cookieParser());
//var http = require('http');

// var middleware= require('../middleware');
// var csrf = require('csurf');
// var csrfProtection = csrf({ cookie: true });
// var bcrypt=require('bcrypt');
//app.engine('handlebars', hb({defaultLayout: 'pen'}));
//http.createServer(function (req, res) {
//res.end('The current time is ' + Date.now())


app.get('/', function (req, res) {
    res.render('pen');
});
app.get('/pen', function (req, res){
    db.query('SELECT * FROM links ', function (err, results){
        if(err) {
            console.log(err);
        } else {
            console.log("hereee");
            res.render('pen', {links:results.rows});
            console.log(results.rows);
        }
    });
});
app.post('/pen', function (req, res){
    var url = req.body.url;
    var sometext = req.body.sometext;
    console.log(url);
    db.query('INSERT INTO links ( url, sometext) VALUES ($1, $2)', [url, sometext], function(err, results){
        if (!err){
            res.redirect('/pen');
        } else {
            console.log(err);

        }
    });
});
app.get('/item/:id', function(req,res){    db.query(
    `SELECT links.id AS links_id, comments.linksid AS comments_linksid, comments.comment AS comment, links.url AS url

        FROM links
        JOIN comments
        ON links.id = comments.linksid
        WHERE links.id=$1;`,[req.params.id], function(err, results){
        if(!err){
            console.log(results.rows);

            //  res.render('displaycomment', results.rows[0]);

            res.render('displaycomment', {myData : results.rows} );
        } else {
            console.log(err);
        }
    });
});
app.post('/item/:id', function(req,res){

    console.log(req.query);
    var comment=req.body.comment;
    var linksid=req.params.id;
    db.query('INSERT INTO comments (linksid, comment) VALUES($1,$2)', [linksid,comment], function(err,results){
        if(!err){
            //console.log("did it wokr?");
            //console.log(results);
             //res.redirect('/item?id=', );
             //res.render('displaycomment', {myData:results});
             res.redirect('/item/'+ req.params.id);

        } else{
            console.log(err);
        }
    });
});


app.listen(8080);
