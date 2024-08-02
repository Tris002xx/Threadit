const convertDateFormat = (dateToFormat) => {
  const timeToFormat = dateToFormat.split(" ")[4];
  const timeHour = timeToFormat.split(":")[0];
  const timeMin = timeToFormat.split(":")[1];
  return `${timeHour}:${timeMin}`;
};

module.exports = { convertDateFormat };
