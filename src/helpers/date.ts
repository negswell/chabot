// Function to get the name of the weekday
export function getWeekdayName(date: Date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

// Function to get the current time in HH:MM format
export function getCurrentTime(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}
