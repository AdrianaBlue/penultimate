// $.ajax({
//     url: '/item/' + thecommentslinksid,
//     method: 'POST',
//     data: {
//         limit: 20
//     },
//     success: function(data) {
//         console.log(data);
//     }
// });

$('#expand').click(function(){
    $.ajax({
        url: '/displayingcommentfamily/item?id='+thecommentslinksid + "&parentid="+parentid,
        //url: '/displayingcommentfamily/item?id='+ $('#thecommentsid').serlialize() +  $('#thecommentslinksid').serlialize()
        //url: '/displayingcommentfamily/item?id='+ parentid= + & + thecommentslinksid=,
        //"/item/"+ thecommentslinksid,
        method:'GET',
        success: function(result){
            console.log(result);

        //     $(".children").JSON(result);
        },
        error: function (error){
            console.log(error);
        }
    });
});



//make a button to make ajax request
//    WHERE links.id=$1 AND comments.parentid IS NULL;
//which asks db for linksid and parentsid /which are comments-childcomments and the browser needs response
//send back as json ....

var thecommentslinksid= $('#thecommentslinksid').val();
console.log(thecommentslinksid);
var parentid =$('#thecommentsid').val();
//first is to get the value of the id of the input in displaycomment.handlebars

// var childid=
// var parentid=
// // $( '#reply' ).click(function() {
// //     $('#commentslinksid').prop('type','text');
// // });
// //
//
// $( "#reply" ).click(function() {
//     $( "#children" ).show( "slow", function() {
//         // Animation complete.
//     });
// });
