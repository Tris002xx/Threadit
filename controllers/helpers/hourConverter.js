const hourConverter = (hours, hoursInUnit) => {
  return parseInt((hours / hoursInUnit).toFixed(0));
};

module.exports = { hourConverter };
