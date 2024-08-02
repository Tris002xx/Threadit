const { User, Post } = require("../database/models");
const isAuthenticated = require("./isAuthenticated");

const findTimeDifference = (starting, now) => {
  let startingHour = parseInt(starting.split(":")[0]);
  let startingMin = parseInt(starting.split(":")[1]);

  let nowHour = parseInt(now.split(":")[0]);
  let nowMin = parseInt(now.split(":")[1]);

  if (nowMin < startingMin) {
    nowHour -= 1;
    nowMin += 60;
  }

  const timePassed = `${nowHour - startingHour}:${nowMin - startingMin}`;
  console.log(timePassed);
  return timePassed;
};

const currentTime = () => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [time, period] = currentTime.split(" ");
  const [hour, minute] = time.split(":");
  let formattedHour = parseInt(hour);
  if (period === "PM") {
    formattedHour += 12;
  }

  return `${formattedHour}:${minute}`;
};

const convertDateFormat = (dateToFormat) => {
  const timeToFormat = dateToFormat.split(" ")[4];
  const timeHour = timeToFormat.split(":")[0];
  const timeMin = timeToFormat.split(":")[1];
  return `${timeHour}:${timeMin}`;
};

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
