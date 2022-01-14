const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const customParseFormat = require("dayjs/plugin/customParseFormat");

const getDate = (apiDate) => {
  const d = new Date("2021-01-18T10:01:42.151Z");
  const month = parseInt(d.getUTCMonth()) + 1;
  const newDate = `${d.getUTCDate()}-${month}-${d.getUTCFullYear()}`;

  console.log("year ", newDate);
};

getDate();

// export const convertApiDate = (apiDate) => {
//   const d = new Date(apiDate);
//   return moment(d).format("DD-MM-YYYY");
// };

export const convertApiDate = (apiDate) => {
  dayjs.extend(utc);

  const d = new Date(apiDate);
  const newDate = dayjs(d).format("DD-MM-YYYY");

  return newDate;
};
