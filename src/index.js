import Fetch from 'isomorphic-fetch';
import jws from 'jws';
import os from 'os';

const LOGIN_TYPE_SERVER = "Server"

const getAuthString = (config) => {
  const plainAuth = config.appkey + ':' + config.appsecret;
  const buffer = new Buffer(plainAuth);
  const base64Auth = buffer.toString('base64');
  return base64Auth;
}

export class Chronos {
  constructor(config) {
    this.config = config;
    this.token = '';
  }

  _checkStatus(response) {
    console.log('response status: ' + response.status);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  _parseJSON(response) {
    return response.json();
  }

  _serverLoginAsync() {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.authManagerURL + '/v1/login/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': LOGIN_TYPE_SERVER,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
  }

  _updateJobStatus(instanceID, status) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Bearer ${this.token}`);
    return fetch(this.config.chronosURL + '/v1/jobcustomstatus', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'instance_id': instanceID,
        'status': status
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
  }

  _getToken() {
    return this._serverLoginAsync()
    .then(data => {
      if (data && data.Token) {
        return Promise.resolve(data.Token);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
  }

  getShortInstanceID() {
    return os.hostname()
  }

  updateJobStatus(instanceID, status) {
    if (this.token === '') {
      return this._getToken()
      .then(token => {
        this.token = token;
        return this._updateJobStatus(instanceID, status);
      })
      .catch(error => {
        return Promise.reject(error)
      })
    } else {
      return this._updateJobStatus(instanceID, status);
    }
  }
}
