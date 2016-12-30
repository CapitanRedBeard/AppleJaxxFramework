const GOOGLE_FEED_API_URL = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';

export default Api = {
  fetchRss(url) {
    if (!(/^http:\/\//.test(url))) {
      url = "http://" + url;
    }

    const googleFeedURL = GOOGLE_FEED_API_URL + encodeURIComponent(url);

    return fetch(googleFeedURL).then((res) => res.json());
  }
};
