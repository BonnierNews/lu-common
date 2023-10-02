"use strict";
const moment = require("moment");
const { isHoliday } = require("swedish-holidays");
const bankHolidays = [
  "Nyårsdagen",
  "Trettondedag jul",
  "Långfredagen",
  "Påskafton",
  "Påskdagen",
  "Annandag påsk",
  "Första maj",
  "Kristi himmelsfärdsdag",
  "Pingstafton",
  "Pingstdagen",
  "Sveriges nationaldag",
  "Midsommarafton",
  "Midsommardagen",
  "Alla helgons dag",
  "Julafton",
  "Juldagen",
  "Annandag jul",
  "Nyårsafton",
];
function isBankDay(d) {
  const md = moment(d);
  // weekends are never bankdays
  if ([ 0, 6 ].includes(md.weekday())) return false;
  const holiday = isHoliday(md.toDate());
  // not a holiday
  if (!holiday) return true;

  return !bankHolidays.includes(holiday.name);
}

function nextBankDay(d) {
  let md = moment(d);
  do {
    md = md.add(1, "day");
  } while (!isBankDay(md));
  return md.format("YYYY-MM-DD");
}

module.exports = { isBankDay, nextBankDay };
