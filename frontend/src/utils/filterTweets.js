// Filters tweets by selected hashtag
const filterTweets = (tweets, selectedHashtag) => {
  if (!selectedHashtag) return tweets;

  const filtered = tweets.filter((status) => {
    const found = status.entities.hashtags.find((hashtag) => hashtag.text === selectedHashtag);
    if (found) return true;
    return false;
  });
  return filtered;
};

export default filterTweets;
