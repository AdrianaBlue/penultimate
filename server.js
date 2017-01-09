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
            res.render('pen', {links:results.rows});
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
    `SELECT links.id AS links_id, comments.linksid AS comments_linksid, comments.comment AS comment, links.url AS url,
    links.sometext AS sometext, comments.id AS comments_id, comments.parentid AS parentid
    FROM links
    INNER JOIN comments
    ON links.id = comments.linksid
    WHERE links.id=$1;`,[req.params.id], function(err, results){

        if(results.rows.length===0){
            console.log("no results");
            db.query(`SELECT * FROM links WHERE id=$1;`,[req.params.id], function(err,results){
                if(err) {
                    console.log(err);
                }else{

                    console.log(results.rows);
                    console.log('check the names of the things');// log res. plus spr imiona tych rzeczy .
                    res.render('displaycomment', {myData: results.rows, url: url, sometext: sometext});
                }
            });
        } else {
            if(!err){
                console.log(results.rows);

                var url = results.rows[0].url;
                var sometext = results.rows[0].sometext;


                res.render('displaycomment', {myData : results.rows, url: url, sometext: sometext} );
            } else {
                console.log(err);
            }
        }
    });
});
app.post('/item/:id', function(req,res){

    var comment=req.body.comment;
    var linksid=req.params.id;
    var parentid;
    if(req.body.parentcommentid===undefined){
        parentid=null;
    } else {
        parentid=req.body.parentcommentid;
    }


    console.log("this is the parentid");
    console.log(parentid);
    db.query('INSERT INTO comments (linksid, comment, parentid) VALUES($1,$2,$3)', [linksid,comment, parentid], function(err,results){
        if(!err){
            //console.log("did it work?");
            //console.log(results);
            //res.redirect('/item?id=', );
            //res.render('displaycomment', {myData:results});
            //res.redirect('/item/'+ req.params.id);

        } else {
            console.log(err);
        }
    });
});

app.post('/item/:comments_id/subcomment', function(req,res){
    var comment=req.body.comment;
    // console.log(comment);
    // console.log(req.body.parentcommentid);
    // write an if statement that, if the comment does not have a parentid, set its parentcommentid to null
    // also need linksid
    var linksid = req.body.linksid;
    // console.log(req.body.parentcommentid);
    // console.log("that was for checking the perrentcommentid");
    console.log(linksid);
    console.log("that was for checking linksid");
    // FROM MATT - along with the query you currently have, you need to also insert the linksid and then
    db.query(`INSERT INTO comments (comment, linksid ,parentid) VALUES ($1,$2,$3)`, [comment,linksid, req.body.parentcommentid], function(err, results){
        if(!err){
            console.log(results.rows);

            res.redirect('/item/'+linksid);
                //TO POSTGRES/GIVE ME BACK THE DATA FROM comments
            // res.render('displaycomment', {myData:results.rows});
        } else{
            console.log(err);
                console.log("is this one????");
        }
    });
    // db/insert newcomment/id of the comment and id of the parent comment (commentid=subcomment parent's id) into comments
});

app.listen(8080);
