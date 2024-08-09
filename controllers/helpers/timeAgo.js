const timeAgo = async (then) => {
  const now = new Date();
  const seconds = Math.floor((now - then) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const timeOptions = [
    { amount: seconds, unit: "seconds" },
    { amount: minutes, unit: "minutes" },
    { amount: hours, unit: "hours" },
    { amount: days, unit: "days" },
    { amount: weeks, unit: "weeks" },
    { amount: months, unit: "months" },
    { amount: years, unit: "years" },
  ];

  if (seconds === 0) {
    return `posted now`;
  }

  for (const item of timeOptions) {
    let time = Infinity;
    if (item.amount <= time && item.amount !== 0) {
      time = item.amount;
      output = item;
    }
  }

  if (output.amount === 1) {
    output.unit = output.unit.slice(0, -1);
  }

  return `${output.amount} ${output.unit} ago`;
};

module.exports = { timeAgo };
