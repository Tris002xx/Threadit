const { User, Post } = require("../database/models");
const isAuthenticated = require("./isAuthenticated");

const { findTimeDifference } = require("./helpers/findTimeDifference");
const { convertDateFormat } = require("./helpers/convertDateFormat");
const { currentTime } = require("./helpers/currentTime");

const renderPosts = async (req, res) => {
  try {
    const result = await Post.findAll({ include: User });
    const posts = result.map((post) => post.toJSON());

    for (let post of posts) {
      const createdTime = convertDateFormat(`${post.createdAt}`);
      const nowTime = currentTime();
      const timePassed = findTimeDifference(createdTime, nowTime);
      let formattedTimePassed = ``;
      let unitTime = ``;

      // If no hour has passed
      if (timePassed.split(":")[0] === `0`) {
        formattedTimePassed = parseInt(timePassed.split(":")[1]);
        if (formattedTimePassed === 1) {
          unitTime = "min";
        } else {
          unitTime = "mins";
        }
      }

      // if an hour has passed within the same day
      if (
        timePassed[0] > `0` ||
        (timePassed[0] <= "2" && timePassed[1] <= "4")
      ) {
        formattedTimePassed = parseInt(timePassed.split(":")[0]);
        if (formattedTimePassed === 1) {
          unitTime = "hr";
        } else {
          unitTime = "hrs";
        }
      }

      // if more than a day
      if (timePassed[0] > "2" && timePassed[1] > "4") {
        formattedTimePassed = (
          parseInt(`${timePassed[0]}${timePassed[1]}`) / 24
        ).toFixed(0);
        if (formattedTimePassed === 1) {
          unitTime = "day";
        } else {
          unitTime = "days";
        }
      }

      post.createdAt = `${formattedTimePassed} ${unitTime}`;
    }

    if (isAuthenticated(req)) {
      res.render("pages/index", { posts: posts, user: req.user });
      console.log("Logged In");
    } else {
      res.render("pages/index", { posts: posts, user: false });
      console.log("Not logged in");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderPosts };
