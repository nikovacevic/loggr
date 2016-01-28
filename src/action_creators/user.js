/**
 * Change the username
 *
 * @param {string} newUsername - The new username to apply
 * @return {object} - Action object
 */
export function changeUsername(newUsername) {
  return {
    type: 'CREATE_LOG',
    newUsername
  };
}
