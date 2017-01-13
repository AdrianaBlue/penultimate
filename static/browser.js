

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
var thecommentslinksid= $('#thecommentslinksid').val();
console.log(thecommentslinksid);


$('.expand').click(function(){

    var parentid=$(this).attr("name");
    // });

    console.log('parentid');
    $.ajax({
        url: '/displayingcommentfamily/item?id='+thecommentslinksid + "&parentid="+parentid,

        method:'GET',
        success: function(result){
            console.log(result);

            // $('#'+ parentid).html(result.myData[0].comment);

            //     $(".children").JSON(result);
            //var i;
            //var result="";
            // for (i=0; i< result.myData.comment.length; i++){
                //result+=i; wrong because it is adding the "i "to results
                // var arr=result.myData.comment;
                // arr.forEach(function(comment){
                //     console.log(comment);
                // });
                var html="";
                for(var i =0; i< result.myData.length ; i++){
                    html+=result.myData[i].comment;
                    //console.log(result.myData[i].comment);
                }

            $('#'+ parentid).html(html);





        },
        error: function (error){
            console.log(error);
        }
    });
});

//rozpisac handlebars
//var html=Handlebars.template.commentslist(result)
//for in loop
