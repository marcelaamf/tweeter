/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("client is ready");

  // Create New Tweet
  const createTweetElement = function(tweet) {
    const escapeText = function(str) {
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
          <p>${escapeText(timeago.format(tweet.created_at))}</p>
          <div class ="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>      
      </article>`
    );
    return $tweetMsg;
  };
  // Render Tweets
  const renderTweets = function(tweetsDataBase) {
    $('.posted-tweets').empty();
    for (let tweet in tweetsDataBase)
      $('.posted-tweets').prepend(createTweetElement(tweetsDataBase[tweet]));

  };
  renderTweets();


  //Submit New Tweets
  const submitForm = $('form');
  submitForm.on('submit', function(event) {
    event.preventDefault();
      
    const data = $(this).serialize();
      
    const errorMsg = $(".error").hide("fast");
    if (!($("#tweet-text").val())) {
      errorMsg.text("⚠ Type your tweet before submitting ⚠");
      errorMsg.slideDown('slow');
      return;
    }

    if ($("#tweet-text").val().length > 140) {
      errorMsg.text("⚠ Your text is too big ⚠");
      errorMsg.slideDown('slow');
      return;
    }

    $.ajax({
      method: 'POST',
      url: "/tweets",
      data: data,
      success: function() {
        loadTweets();
        submitForm.trigger("reset");
        errorMsg.trigger("reset");
        $('#counter').text(140);
      },
      error: function(error) {
        console.log("Error on data:", error);
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
      .catch((error) => {
        console.log("Error on data:", error)
      })
  };
  loadTweets();

});