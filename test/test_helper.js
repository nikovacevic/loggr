import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import fetch from 'isomorphic-fetch';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.fetch = fetch;
global.window.localStorage = {
  _data       : {},
  setItem     : function(id, val) { return this._data[id] = String(val); },
  getItem     : function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
  removeItem  : function(id) { return delete this._data[id]; },
  clear       : function() { return this._data = {}; }
};

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
