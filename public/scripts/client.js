/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  console.log("client is ready");
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

// Create New Tweet
  const createTweetElement = function(tweet){
    const escapeText = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    let $tweetMsg = $(
      `<article class="tweets-container">
        <header>
          <div class="avatar-name">
            <img class ="avatar" src="${escapeText(tweet.user.avatars)}">
            <p>${escapeText(tweet.user.name)}</p>   
          </div> 
          <p>${escapeText(tweet.user.handle)}</p>
        </header>
          <p class="tweets-texts">${escapeText(tweet.content.text)}</p>
        <footer>
          <p>${escapeText(timeago.format(`${tweet.created_at} days ago`))}</p>
          <div class ="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>      
      </article>`
    );
    return $tweetMsg;
  }
// Render Tweets
  const renderTweets = function(tweetsDataBase) {
    for (let tweet in tweetsDataBase)
    $('.posted-tweets').prepend(createTweetElement(tweetsDataBase[tweet]));
   
  }
  renderTweets();


//Submit New Tweets
  
    const submitForm = $('form')
    submitForm.on('submit', function(event) {
      event.preventDefault();
      const data = $(this).serialize();
      
     if(!($("#tweet-text").val())) {
      alert("Please type your tweet text before submitting");
     return;
     }

     if($("#tweet-text").val().length > 140) {
      alert("The text is too long");
     return;
     }

      $.ajax({
        method: 'POST',
        url: "/tweets",
        data: data,
        success: function() { 
          loadTweets();
        }
      });
    });
   
 
//Load new tweets
  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: "/tweets",
    })  
    .then((response) => {
          renderTweets(response);
    })
  };
  loadTweets();

});