import chai from 'chai';
import {formatTimeStr, roundTo15} from '../../src/core/time';

// access 'should' from chai
const should = chai.should(); // eslint-disable-line no-unused-vars

// describe unit
describe('log model', () => {
  it('can log to the nearest 15-minute interval', () => {
    roundTo15(0).should.equal(15);
    roundTo15(12).should.equal(15);
    roundTo15(17).should.equal(15);
    roundTo15(18).should.equal(30);
    roundTo15(40).should.equal(45);
    roundTo15(48).should.equal(60);
    roundTo15(59).should.equal(60);
  });

  it('convert time text from a:bb to rounded h:mm', () => {
    formatTimeStr('0:00').should.equal('0:15');
    formatTimeStr('4:10').should.equal('4:15');
    formatTimeStr('1:01').should.equal('1:00');
  });

  it('convert time text from a.b to rounded h:mm', () => {
    formatTimeStr('.5').should.equal('0:30');
    formatTimeStr('.33').should.equal('0:30');
    formatTimeStr('1.5').should.equal('1:30');
    formatTimeStr('4.5').should.equal('4:30');
  });

  it('convert time text from a to rounded h:mm', () => {
    formatTimeStr('0').should.equal('0:15');
    formatTimeStr('1').should.equal('1:00');
    formatTimeStr('2').should.equal('2:00');
    formatTimeStr('10').should.equal('0:15');
  });
});
