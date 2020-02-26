$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    // counter reduces on input
    let limit = +$(this)
      .closest('.new-tweet')
      .data('limit');
    let length = $(this).val().length;
    let remain = limit - length;
    let counter = $(this)
      .closest('.new-tweet')
      .find('.counter');
    counter.text(remain);

    //excess count changes color to red
    if (remain < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  });
});
