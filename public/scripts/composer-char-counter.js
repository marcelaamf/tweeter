$(document).ready(function() {
  console.log("document is ready");
  let counterTotal = $("#counter");
  let text =$("#tweet-text");
  counterTotal.text(140);

  $("#tweet-text").on('input', function(){
      counterTotal.text(140 - this.value.length);
      if(counterTotal.text() < 0) {
        counterTotal.css('color', 'red');
      } else {
        counterTotal.css('color', '');
      } console.log("test2")
  }); 
});