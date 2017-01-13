

make a button to make ajax request
   WHERE links.id=$1 AND comments.parentid IS NULL;
which asks db for linksid and parentsid /which are comments-childcomments and the browser needs response
send back as json ....

var thecommentslinksid= $('#thecommentslinksid').val();
console.log(thecommentslinksid);
var parentid =$('#thecommentsid').val();
first is to get the value of the id of the input in displaycomment.handlebars

var childid=
var parentid=
// $( '#reply' ).click(function() {
//     $('#commentslinksid').prop('type','text');
// });
//

$( "#reply" ).click(function() {
    $( "#children" ).show( "slow", function() {
        // Animation complete.
    });
});


$.ajax({
    url: '/item/' + thecommentslinksid,
    method: 'POST',
    data: {
        limit: 20
    },
    success: function(data) {
        console.log(data);
    }
});
var idOfTheComment="button#expand"+parentid;


$(".expand").click(function(e){
    var myId= $(e.target).attr("id");

    // to get this.comments_id you need to use str.substring to get the number out of the end of myId
    // then you use that number, add it to the end of thecommentslinksid + number......and then add these two new variables to your ajax url

    var thecommentslinksid= $('#thecommentslinksid').val();
    var parentid =$('#thecommentsid').val();

    $.ajax({
        url: '/displayingcommentfamily/item?id='+thecommentslinksid + "&parentid="+parentid,
        url: '/displayingcommentfamily/item?id='+ $('#thecommentsid').serlialize() +  $('#thecommentslinksid').serlialize()
        url: '/displayingcommentfamily/item?id='+ parentid= + & + thecommentslinksid=,
        "/item/"+ thecommentslinksid,
        method:'GET',
        success: function(result){
            console.log(result);
            console.log("hit expand");
            console.log(parentid);

            // $('#'+ parentid).html(result.myData[0].comment);
            $('#'+myId).html(result.myData[0].comment);

        },
        error: function (error){
            console.log("error");
            console.log(error);
        }
    });
});

canot rely and display the comment chcild
display all of the childd comments esult.myData[0].comment);
display them as html to show replay and expand button



first is to get the value of the id of the input in displaycomment.handlebars

var childid=
var parentid=
// $( '#reply' ).click(function() {
//     $('#commentslinksid').prop('type','text');
// });
//

$( "#reply" ).click(function() {
    $( "#children" ).show( "slow", function() {
        // Animation complete.
    });
});
