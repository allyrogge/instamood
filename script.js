var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";
var NUMBER_OF_PICS;
var total_sentiment = 0;
// what do you think a variable in all caps means?

$(document).ready(function() {
  var token = window.location.hash;
  if (!token) {
    window.location.replace("./login.html");
  }
  token = token.replace("#", "?"); // Prepare for query parameter
  var mediaUrl = API_DOMAIN + RECENT_MEDIA_PATH + token;

  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: handleResponse,
    error: function() {
      alert("there has been an error...")
    }
  })
});

function handleResponse(response) {
  console.log(response)
  //the number of pictures, to be used for multiple functions below
  var NUMBER_OF_PICS=response.data.length;
  //for loop to display the photos
  for (var i=0; i<response.data.length; i++) {

    var url= response.data[i].images.standard_resolution.url;
    if (response.data[i].caption != null){
      var caption=response.data[i].caption.text;
      // getSentiment (caption);
    }
    else {
 var caption = $("<div class=caption></div>").html("");
 }
 // caption.attr("id", "pic-" + i);
 // $("#list").append(caption);
   // console.log(url);
    $("#list").append("<img src=" + url + "/>");
    $("#list").append("<div>" + caption + "</div>");

  }
var selfLikes = 0;
 for (var i = 0; i < NUMBER_OF_PICS; i++) {
  if (response.data[i].user_has_liked) 
     selfLikes++;
 }
 var egoScore = Math.floor((selfLikes / NUMBER_OF_PICS) * 100);

// var days=[0,0,0,0,0,0,0]
// var week=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//section calling all the stats to the actual page
$("#ego span").append(egoScore);


// var selfLikes = 0;
//  for (var i = 0; i < NUMBER_OF_PICS; i++) {
//   if (response.data[i].user_has_liked) 
//      selfLikes++;
//  }
//  var egoScore = Math.floor((selfLikes / NUMBER_OF_PICS) * 100);

// // var days=[0,0,0,0,0,0,0]
// // var week=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// //section calling all the stats to the actual page
// $("#ego").append(egoScore);


// Popularity
// 1. find number of likes on each photo
// 2. add the number of likes per each photo and store to a variable
// 3. divide this variable by 20
// // 4. append this
//  var totalLike= 0;

//   for (var i = 0; i < NUMBER_OF_PICS; i++) {
//   totalLike += response.data[i].likes.count;
// }
// var Popularityscore = Math.round((totalLike)/ NUMBER_OF_PICS);
// $("#Popularity").append(Popularityscore);
 var likeTotal = 0;
  for (var i = 0; i < NUMBER_OF_PICS; i++) {
    likeTotal += response.data[i].likes.count;
  }
  var popularityScore = Math.round(likeTotal / NUMBER_OF_PICS);

$("#pop span").append(popularityScore);
console.log(popularityScore)

  // for (var i=0; i<response.response.docs.length; i++) {
  //   $("#list").append("<div>"+response.response.docs[i].headline.main+"</div>");
  //   console.log(response.response.docs[i].headline.main)
  // }

  var days = [0, 0, 0, 0, 0, 0, 0];
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (var i = 0; i < NUMBER_OF_PICS; i++) {
   var time = parseInt(response.data[i].created_time);
   var date = new Date(time * 1000);
   days[date.getDay()]++;
 }
 var mostActiveDay = week[(Math.max.apply(Math, days))];
 $("#days span").append(mostActiveDay);

 console.log(mostActiveDay)


// BREVITY:
//  1 Sum the length of every caption
//   2 Divide by number of captions and return average

var captionlength =0;
for (var i=0; i< NUMBER_OF_PICS; i++) {
  if (response.data[i].caption != null){
  captionlength += response.data[i].caption.text.length;
}
}
var brevity = Math.round(captionlength / NUMBER_OF_PICS);
$("#Brevity span").append(brevity)
console.log(brevity)

//Visibility Thirst
//1. find out number of hashtags 
//2. sum
//3. divide
var Visibility= 0;
for (var i=0; i<NUMBER_OF_PICS; i++) {
  if (response.data[i].tags.length) {
Visibility += response.data[i].tags.length;
  }
}
var Visibility = Math.round(Visibility/ NUMBER_OF_PICS)
$("#Visibility-Thirst").append(Visibility)
}
// function getSentiment (text) {
//   $.each(response.data, function (i,val){
//     if (val.caption != null){
//       var captionlength= val.caption.text;}
//       else (var caption= "";
//       var sentimentURL ="https://twinword-sentiment-analysis.p.mashape.com/analyze/"
//     }

//   })
//   $.ajax({
//     url: 'https://twinword-sentiment-analysis.p.mashape.com/analyze/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     type: 'POST', // The HTTP Method
//     data: "text=" + text, // Additional parameters here
//     datatype: 'json',
//     success: processSentiment,
//     error: function(err) { alert(err); },
//     beforeSend: function(xhr) {
//     xhr.setRequestHeader("X-Mashape-Authorization", "Kl8DKH9lt6mshkPPsBYgmL7YHEaYp16KOfhjsnNJ5XkW2acY1m"); // Enter here your Mashape key
//   }
// });

// }
// function processSentiment (data, index) {
//   console.log(data);
//   var newScore= $('<div></div>').html("sentiment score:" + data.score);
//   $("#list" + index).append(newScore);
//   addSentiment(data.score);
//   function addSentiment (score) {
//     caption_number++
//     total_sentiment= (total_sentiment * caption_number) + score;
//     total_sentiment /= caption
//   }
// }
// $("#sentiment").html(total_sentiment);
// }



