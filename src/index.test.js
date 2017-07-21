import { expect } from 'chai';
import { Chronos } from './index';
import Config from '../config.json'

describe('set custom status', () => {
  it('should update custom status', (done) => {
    let chronos = new Chronos(Config);
    chronos.updateJobStatus(Config.instanceID, Config.status)
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('set custom status using short instanceID', () => {
  it('should update custom status using short instanceID', (done) => {
    let chronos = new Chronos(Config);
    chronos.updateJobStatus(Config.shortInstanceID, Config.status + "--short--")
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});
