$(document).ready(function() {
  //wrap all into a document ready so it loads all at once.
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    let $this = $(this);
    let data = $this.serialize();
    let textAreaValue = $this.children('textarea').val();
    if (textAreaValue.length === 0) {
      $('.alert')
        .text('Text box is empty')
        .slideDown();
      $(this)
        .find('texarea')
        .focus();
    } else if (textAreaValue.length > 140) {
      $('.alert')
        .text('Too many characters in tweet!')
        .slideDown();
      $(this)
        .find('texarea')
        .focus();
    } else {
      $('.alert').slideUp();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: data
      }).then(() => {
        // after POST request make GET request to render the new tweet
        loadTweets();
        $('.counter').text(140);
      });
    }
  });
  // adds all tweets to #tweets-container
  const renderTweets = tweetsDatabase => {
    $('.alert').hide();
    // remove any tweets that are already in the container
    $('#tweets-container').empty();

    // turn each tweet in database into an html element, and append them to container
    for (const tweet of tweetsDatabase) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    //loads all tweets on page
    $.ajax({ url: '/tweets', method: 'GET' }).then(tweets => {
      renderTweets(tweets);
    });
  };

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const stamp = new Date(tweet.created_at).toLocaleString();
    //dynamic submission form
    let $tweet = $(`
      <article class="single_tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars}">
        <h2>${tweet.user.name}</h2>
        <span class='handle right'>${tweet.user.handle}</span>
      </header>
      <p class="tweetText">${tweet.content.text}</p>
      
      <footer>
        <span>${stamp}</span>
        <div class="tweet-icons">🚩 🔄 ❤️</div>
      </footer>
    </article>
    `).addClass('tweet');
    $('textarea').val('');
    console.log('stamp', stamp);
    return $tweet;
  };

  loadTweets();
});
