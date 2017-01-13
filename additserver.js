var express = require('express');
var app = express();
var hb = require('express-handlebars');
var path=require('path');
app.use('/static',express.static(path.join(__dirname,'static')));
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
var db = require('./db');
var pg = require('pg');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false }
));


//app.use(cookieParser());
// var http = require('http');
// var middleware= require('../middleware');
// // var csurf = require('csurf');
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
    db.query('INSERT INTO links ( url, sometext) VALUES ($1, $2)', [url, sometext], function(err, results){
        if (!err){
            res.redirect('/pen');
        } else {
            console.log(err);

        }
    });
});
app.get('/item/:id', function(req,res){
    //console.log(req.params.id, "this is for checking");

    db.query(`SELECT
        links.id AS links_id,
        comments.linksid AS comments_linksid,
        comments.comment AS comment,
        links.url AS url,
        links.sometext AS sometext,
        comments.id AS comments_id,
        comments.parentid AS parentid
        FROM links
        INNER JOIN comments
        ON links.id = comments.linksid
        WHERE links.id=$1 AND comments.parentid IS NULL;`,[req.params.id], function(err, results){
            // console.log(results.rows);
            //to make a condition if it ajax res.rend(results.json)
            if(results.rows.length==0){
                //console.log("no results");
                db.query(`SELECT * FROM links WHERE id=$1;`,[req.params.id], function(err,results){
                    if(err) {
                        console.log(err);
                    } else {
                        // console.log(results.rows);
                        var url = results.rows[0].url;
                        var sometext = results.rows[0].sometext;
                        //    console.log('check the names of the things');
                        //console.log(req.body.comment, "this is a comment");
                        res.render('displaycomment', {myData: results.rows, url: url, sometext: sometext});
                    }
                });
            } else {
                if(!err){
                    //console.log(results.rows);

                    var url = results.rows[0].url;
                    var sometext = results.rows[0].sometext;
                    res.render('displaycomment', {myData : results.rows, url: url, sometext: sometext} );
                } else {
                    console.log(err);
                }
            }
        });
});
    //create a condition item/id that says if this is an AJAX request , do res.json() with the result
    //google for express if it is ajax
    //res.json()
app.get('/displayingcommentfamily/item', function(req,res){
    //console.log("i am checking req.query");
    // console.log(req.query);

    //console.log(req.params.id);
    //console.log("i am checking req.params.id");
    console.log(req.query.id);
    console.log(req.query.parentid);
    db.query(`SELECT * FROM comments

        WHERE comments.linksid=$1 AND comments.parentid=$2;`, [req.query.id, req.query.parentid], function(err, results){
            // [req.params.id,req.query.id]
            if(err) {
                console.log(err);
            } else {
                res.json({myData:results.rows});
                //res.send(JSON.stringfy({myData:results.rows,parentid:parentid, linksid:linksid}));
            }
        });
});
//param from url
//req.body from form
//req.query in url from ?

app.post('/item/:id', function(req,res){
    var comment=req.body.comment;
    var linksid=req.params.id;
    var parentid;
    if(req.body.parentcommentid===undefined){
        parentid=null;
    } else {
        parentid=req.body.parentcommentid;
    }


    // console.log("this is the parentid");
    // console.log(parentid);
    db.query('INSERT INTO comments (linksid, comment, parentid) VALUES($1,$2,$3)', [linksid,comment, parentid], function(err,results){
        if(!err){
                //console.log("did it work?");
                //console.log(results);
                //res.redirect('/item?id=', );
                //res.render('displaycomment', {myData:results});
                //check it//
            res.redirect('/item/'+ req.params.id);//causeing get request

        } else {
            console.log(err);
        }
    });
});


app.post('/item/:comments_id/subcomment', function(req,res){
    var comment=req.body.comment;
    var linksid = req.body.linksid;
        // FROM MATT - along with the query you currently have, you need to also insert the linksid and then
    db.query(`INSERT INTO comments (comment, linksid ,parentid) VALUES ($1,$2,$3)`, [comment,linksid, req.body.parentcommentid], function(err, results){
        if(!err){
            console.log(results.rows);
            res.redirect('/item/'+linksid);

                //TO POSTGRES/GIVE ME BACK THE DATA FROM comments
                // res.render('displaycomment', {myData:results.rows});
        } else {
            console.log(err);
        }
    });
        // db/insert newcomment/id of the comment and id of the parent comment (commentid=subcomment parent's id) into comments
});

app.listen(8080);
