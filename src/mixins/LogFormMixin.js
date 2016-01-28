//
// LogFormMixin.js
//
// - Expects refs: this.dateInput, this.descInput, this.durationInput,
//   this.projectNameInput, this.saveButton
// - Components should call setStateWithDefaults() during componentWillMount(),
//   because getInitialState() is not called here
//

const initialState = {
  date: null,
  desc: null,
  duration: null,
  projectName: null
};

const LogFormMixin = {
  /**
   * Get the log object from state
   *
   * @return {object} - The log object
   */
  getLogFromState: function() {
    return {
      date: this.state.date,
      desc: this.state.desc,
      duration: this.state.duration,
      projectName: this.state.projectName
    };
  },

  /**
   * Update state when a date is selected
   *
   * @param {string} newDate - The new log date
   * @param {function} callback - Optional setState callback
   */
  handleDateChange: function(newDate, callback) {
    this.setState({
      date: newDate
    }, callback);
  },

  /**
   * Submit form on enter, if required fields have values
   */
  handleDescEnter: function() {
    this.saveButton.click();
  },

  /**
   * Update state as duration changes
   *
   * @param {string} newDuration - The new duration
   * @param {function} callback - Optional setState callback
   */
  handleDurationChange: function(newDuration, callback) {
    this.setState({
      duration: newDuration
    }, callback);
  },

  /**
   * Submit form on enter, if required fields have values
   */
  handleDurationEnter: function() {
    this.saveButton.click();
  },

  /**
   * Update state as project input changes
   *
   * @param {string} newProjectName - The current input text
   * @param {function} callback - Optional setState callback
   */
  handleProjectChange: function(newProjectName, callback) {
    this.setState({
      projectName: newProjectName
    }, callback);
  },

  /**
   * Update state when user clicks an existing project from dropdown
   *
   * @param {string} newProjectName - The selected project
   * @param {function} callback - Optional setState callback
   */
  handleProjectItemClick: function(newProjectName, callback) {
    this.handleProjectChange(newProjectName, callback);
  },

  /**
   * Is the form valid for submission?
   *
   * @return {boolean} - True/false
   */
  isValid: function() {
    if (!this.state.duration) {
      this.durationInput.focus();
      return false;
    }
    if (!this.state.projectName) {
      this.projectInput.focus();
      return false;
    }
    return true;
  },

  /**
   * Called when we want to clear the log form
   *
   * @param {object} newState - Object with log form state to apply
   */
  setStateWithDefaults: function(newState = {}) {
    for (let prop in initialState) {
      if (newState.hasOwnProperty(prop)) {
        this.setState({
          [prop]: newState[prop]
        });
        continue;
      }
      this.setState({
        [prop]: initialState[prop]
      });
    }
  }
};

export default LogFormMixin;
