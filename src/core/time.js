import _ from 'lodash';

//
// Time.js
//

/**
 * Given time string, return h:mm formatted string
 *
 * @param {string} str - The time user input
 * @return {string} - The formatted time string
 */
export function formatTimeStr(str) {
  // special cases ('.' and ':')
  if (str === '.' || str === ':') {
    return '';
  }
  // case a:bb
  if (str.indexOf(':') !== -1) {
    let pieces = str.split(':');
    if (pieces[0].length === 0) {
      pieces[0] = '0';
    }
    if (parseInt(pieces[0], 10) > 0) {
      pieces[1] = pad(roundTo15(parseInt(pieces[1], 10), true));
    } else {
      pieces[1] = pad(roundTo15(parseInt(pieces[1], 10)));
    }
    return pieces.join(':');
  }
  // case a.b
  let n = parseFloat(str);
  if (str.indexOf('.') !== -1) {
    let minutes = Math.round(n * 60);
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    return hours.toString() + ':' + pad(roundTo15(minutes));
  }
  // case a >= 10
  if (n >= 10) {
    return '0:' + pad(roundTo15(n));
  }
  // case a < 10
  return str + ':00';
}

/**
 * Convert from h:mm to human readable
 *
 * @param {string} str - The h:mm time string
 * @return {string} - The human readable string
 */
export function humanTimeStr(str) {
  let pieces = str.split(':');
  if (pieces[0] === '0') {
    return `${pieces[1]} min`;
  }
  if (pieces[1] === '00') {
    return `${pieces[0]} hr`;
  }
  return `${pieces[0]} ${minuteFraction(pieces[1])} hr`;
}

/**
 * Convert minutes to hour fraction
 *
 * @param {number|string} minutes - The minutes to convert
 * @return {string} - The fraction string
 */
export function minuteFraction(minutes) {
  minutes = parseInt(minutes, 10);
  switch (minutes) {
    case 15:
      return '1/4';
    case 30:
      return '1/2';
    case 45:
      return '3/4';
    default:
      // who are you!
  }
}

/**
 * @param {number} n - The number to round
 * @return {string} - Rounded to nearest 15 minute
 */
export function roundTo15(n, ignoreBaseCase = false) {
  n = Number(n);
  // base case
  if (!ignoreBaseCase && n <= 15) {
    return 15;
  }
  // otherwise, round to most accurate 15
  n = (n % 15 < 3) ? Math.floor(n / 15) * 15 : Math.ceil(n / 15) * 15;
  return n;
}

/**
 * Convert h:mm to h.m (decimal)
 *
 * @param {string} timeStr - The h:mm time string
 * @return {number} - The h.m number value
 */
export function timeStrToDec(timeStr) {
  let pieces = timeStr.split(':').map(str => parseInt(str, 10));
  return pieces[0] + (pieces[1] / 60);
}

/**
 * Pad a string with leading zeros (or some other character)
 *
 * @param {string|number} n - The number to be formatted
 * @param {number} width - The width of the string
 * @param {string} z - The pad character
 * @return {string} - The formatted string
 */
export function pad(n, width = 2, z = '0') {
  return _.padLeft(n, width, z);
}
