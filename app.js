var { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();
var axios = require("axios");
const fetch = require("node-fetch");

var client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
}).readWrite;

function postJoke() {
  fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      try {
        await client.v2.tweet(data.joke);
      } catch (err) {
        console.error(err);
      }
    });
}

postJoke();

setInterval(postJoke, 1000 * 60 * 60);
