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
