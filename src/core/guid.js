//
// Guid.js
//

/**
 * Generate s4 string
 *
 * @return {string} - The random s4 string
 */
export function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export default () => {
  return s4() + s4() + '-' + s4() + '-' + s4() +
    '-' + s4() + '-' + s4() + s4() + s4();
};
