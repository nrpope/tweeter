$(document).ready(function() {
  //wrap all into a document ready so it loads all at once.
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    let $this = $(this);
    let data = $this.serialize();
    let textAreaValue = $this.children('textarea').val();
    if (textAreaValue.length === 0) {
      alert('Text box is empty');
    } else if (textAreaValue.length > 140) {
      alert('Too many characters in tweet!');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: data
      }).then(() => {
        // after POST request make GET request to render the new tweet
        $.ajax({
          method: 'GET',
          url: '/tweets'
        }).done(tweets => {
          // render new tweet on the top of the page
          const $tweet = createTweetElement(tweets[tweets.length - 1]);
          $('.tweets').prepend($tweet);
        });
      });
    }
  });

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    });
  };

  const createTweetElement = function(tweet) {
    //dynamic submission form
    let $tweet = $(`
      <article class="single_tweet">
      <header>
        <img src="${tweet.user.avatars}">
        <h2>${tweet.user.name}</h2>
        <span class='handle right'>${tweet.user.handle}</span>
      </header>
      <p class="tweetText">${escape(tweet['content']['text'])}</p>
      
      <footer>
        <span>${tweet.created_at}</span>
        <div class="tweet-icons">🚩 🔄 ❤️</div>
      </footer>
    </article>
  `).addClass('tweet');
    return $tweet;
  };

  const loadTweets = function() {
    //loads all tweets on page
    $.get('/tweets', function(tweets) {
      renderTweets(tweets);
    });
  };
  loadTweets();
});
