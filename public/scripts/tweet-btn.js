$(function() {
  // hide tweet box on page load
  $('.new-tweet').hide();

  // toggles the compose tweet container
  $('#new-tweet-btn').click(function() {
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  });
  //hides the button once you scroll from the top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('#nav-new-tweet').addClass('hide');
    } else {
      $('#nav-new-tweet').removeClass('hide');
    }
  });
});
