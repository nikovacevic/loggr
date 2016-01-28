import Collection from './Collection';
import moment from 'moment';

//
// Log.js
//

const Log = {

  /**
   * Given a date string MMM D, return smart date
   *
   * @param {string} dateStr - The MMM D date string
   * @return {string} - The formatted date string
   */
  formatDate(dateStr) {
    let fmt = 'YYYY MM DD';
    let now = moment();
    if (dateStr === now.format(fmt)) {
      return 'Today';
    }
    if (dateStr === now.subtract(1, 'days').format(fmt)) {
      return 'Yesterday';
    }
    return moment(dateStr).format('MMM D');
  },

  /**
   * Get todays logs
   *
   * @param {object} c - The logs collection
   * @return {array} - Today's logs
   */
  todaysLogs(c) {
    let today = moment().format('YYYY MM DD');
    let logs = Collection.listify(c);
    return logs.filter(log => log.date === today);
  }

};

export default Log;
