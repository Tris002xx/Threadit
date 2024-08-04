const { User, Post } = require("../database/models");
const isAuthenticated = require("./isAuthenticated");

// Helpers
const { findTimeDifference } = require("./helpers/findTimeDifference");
const { convertTimeFormat } = require("./helpers/convertTimeFormat");
const { currentTime } = require("./helpers/currentTime");
const { hourConverter } = require("./helpers/hourConverter");

const renderPosts = async (req, res) => {
  try {
    const result = await Post.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
    });
    const posts = result.map((post) => post.toJSON());

    for (let post of posts) {
      let formattedTimePassed = ``;
      let unitTime = ``;
      const createdTime = convertTimeFormat(`${post.createdAt}`);
      const nowTime = currentTime();
      const timePassed = findTimeDifference(createdTime, nowTime);
      const timePassedinHour = parseInt(timePassed.split(":")[0]);
      const timePassedinMin = parseInt(timePassed.split(":")[1]);
      const hoursInDay = 24;
      const hoursInWeek = 168;
      const hoursInMonth = 730;
      const hoursInYear = 8760;

      // In minutes
      if (timePassedinHour === 0) {
        formattedTimePassed = timePassedinMin;
        unitTime = formattedTimePassed === 1 ? "min" : "mins";
      }

      // In hours
      if (timePassedinHour > 0) {
        formattedTimePassed = timePassedinHour;
        unitTime = formattedTimePassed === 1 ? "hr" : "hrs";
      }

      // In days
      if (timePassedinHour >= hoursInDay) {
        formattedTimePassed = hourConverter(timePassedinHour, hoursInDay);
        unitTime = formattedTimePassed === 1 ? "day" : "days";
      }

      // In weeks
      if (timePassedinHour >= hoursInWeek) {
        formattedTimePassed = hourConverter(timePassedinHour, hoursInMonth);
        unitTime = formattedTimePassed === 1 ? "week" : "weeks";
      }

      // In months
      if (timePassedinHour >= hoursInMonth) {
        formattedTimePassed = hourConverter(timePassedinHour, hoursInMonth);
        unitTime = formattedTimePassed === 1 ? "month" : "months";
      }

      // In years
      if (timePassedinHour >= hoursInYear) {
        formattedTimePassed = hourConverter(timePassedinHour, hoursInYear);
        unitTime = formattedTimePassed === 1 ? "year" : "years";
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
