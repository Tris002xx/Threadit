const convertDateFormat = (createdAt) => {
  const month = `${createdAt}`.split(" ")[1];
  const day = `${createdAt}`.split(" ")[2];
  const year = `${createdAt}`.split(" ")[3];
  const createdAtDate = `${month} ${day} ${year}`;
  return `${createdAtDate}`;
};

module.exports = { convertDateFormat };
