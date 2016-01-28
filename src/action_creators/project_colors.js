/**
 * Use a project color (remove from unused list and add to used list)
 *
 * @return {function} - Thunk action
 */
export function useProjectColor() {
  const _useProjectColor = projectColorIndex => {
    return {
      type: 'USE_PROJECT_COLOR',
      projectColorIndex
    };
  };
  return (dispatch, getState) => {
    let projectColors = getState().get('projectColors').toJS();
    // find an index where a project color exists,
    // beginning at the current index in state
    let startIndex = projectColors.nextColorIndex;
    let colorCount = projectColors.unused.length;
    for (let i = 0; i < colorCount; i++) {
      let j = (i + startIndex) % colorCount;
      // if this project color array is empty, continue iteration
      if (projectColors.unused[j].length === 0) {
        continue;
      }
      // all we need is the color index, because we're always
      // shifting the first element off the array
      dispatch(_useProjectColor(j));
      return {
        hex: projectColors.unused[j][0],
        index: j
      };
    }
    // if we iterated through all project colors and couldn't
    // find one to use, throw an error
    return console.error(`In useProjectColor(), unable to find a
      project color to use for this new project.`);
  };
}
