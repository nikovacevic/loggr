//
// Exceptions.js
//

/**
 * A generic exception
 *
 * @param {string} message - The exception message
 */
export default function Exception(message) {
  this.message = message;
  this.name = 'Exception';
}
