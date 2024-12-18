/**
 * @method getCookie  根据cookie的name获取cookie值
 * @return {String} 返回cookie值
 * @param cookieStr
 * @param name
 */
function getCookie(cookieStr, name) {
  let end;
  if (cookieStr.length > 0) {
    let start = cookieStr.indexOf(`${name}=`);
    if (start > -1) {
      start += name.length + 1;
      end = cookieStr.indexOf(';', start);
      if (end === -1) {
        end = cookieStr.length;
      }
      return decodeURIComponent(cookieStr.slice(start, end));
    }
  }
  return '';
}