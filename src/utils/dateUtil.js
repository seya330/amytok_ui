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

function getFormatDate4(date) {
  //오전|오후 hh12:mi
  let hour = date.getHours();
  let prefix = hour < 13 ? '오전 ' : '오후 ';
  hour = hour < 13 ? hour : hour - 12;

  let minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  return prefix + hour + ':' + minutes + '';
}
export { getFormatDate, getFormatDate2, getFormatDate3, getFormatDate4 };
