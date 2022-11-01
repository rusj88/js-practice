function isFirstDayOfMonth(date) {
  return date.getDate() === 1;
}

function getDatesFromInterval(startDate, endDate) {
  const dates = [];
  const date = new Date(startDate.getTime());
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

function formatDate(date) {
  function addZero(n) {
    return n < 10 ? "0" + n : n.toString();
  }
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate()
  )}`;
}

