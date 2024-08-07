const currentTime = () => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [time, period] = currentTime.split(" ");
  const [hour, minute] = time.split(":");
  let formattedHour = parseInt(hour);
  // 

  if (period === "AM") {
    formattedHour -= 12;
  }
  console.log(period);
  return `${formattedHour}:${minute}`;
};

module.exports = { currentTime };
