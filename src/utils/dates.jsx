const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
export const day = days[d.getDay()];
const date = d.getDate();
const year = d.getFullYear();
const month = months[d.getMonth()];

export const dateString = date + " " + month + " " + year;
