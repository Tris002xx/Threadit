const findTimeDifference = (starting, now) => {
  const startingHour = parseInt(starting.split(":")[0]);
  const startingMin = parseInt(starting.split(":")[1]);

  let nowHour = parseInt(now.split(":")[0]);
  let nowMin = parseInt(now.split(":")[1]);

  if (nowMin < startingMin) {
    nowHour -= 1;
    nowMin += 60;
  }

  const timePassed = `${nowHour - startingHour}:${nowMin - startingMin}`;
  // console.log(timePassed);
  return timePassed;
};

module.exports = { findTimeDifference };
