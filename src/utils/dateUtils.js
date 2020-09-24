function toTwoDigits(num) {
  if (num < 10) return "0" + num;
  else return num.toString();
}
export function formatDate(time) {
  if (!time) return "";
  let date = new Date(time);
  return (
    date.getFullYear() +
    "-" +
    toTwoDigits(date.getMonth() + 1) +
    "-" +
    toTwoDigits(date.getDate()) +
    " " +
    toTwoDigits(date.getHours()) +
    ":" +
    toTwoDigits(date.getMinutes()) +
    ":" +
    toTwoDigits(date.getSeconds())
  );
}
