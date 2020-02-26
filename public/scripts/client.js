const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac'
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd'
    },
    content: {
      text: 'Je pense , donc je suis'
    },
    created_at: 1461113959088
  }
];

const tweetData = {
  user: {
    name: 'Newton',
    avatars: 'https://i.imgur.com/73hZDYK.png',
    handle: '@SirIsaac'
  },
  content: {
    text: 'If I have seen further it is by standing on the shoulders of giants'
  },
  created_at: 1461116232227
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(document).ready(function() {
      $('.container').append($tweet);
    });
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $(`
      <article class="single_tweet">
      <header>
        <img src="${tweet.user.avatars}">
        <h2>${tweet.user.name}</h2>
        <span class='handle right'>${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <hr />
      <footer>
        <span>${tweet.created_at}</span>
      </footer>
    </article>
  `).addClass('tweet');
  return $tweet;
};
console.log('hello there');
renderTweets(data);
