function getFormatDate(date) {
  //yyyy-mm-dd
  let year = date.getFullYear();
  var month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '-' + month + '-' + day;
}

function getFormatDate2(date) {
  //yyyy-mm-dd
  var month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return month + '월 ' + day + '일';
}

function getFormatDate3(date) {
  //hh시 mi분
  let hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
  let minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  return hours + '시 ' + minutes + '분';
}
export { getFormatDate, getFormatDate2, getFormatDate3 };
