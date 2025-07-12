const request = require('supertest');

class ApiHelper {
  constructor(
    url = '',
    method = 'get',
    reqHeader = {},
    reqBody = {},
    params = '',
    debug = false
  ) {
    this.url = url;
    this.method = method;
    this.reqHeader = reqHeader;
    (this.reqBody = reqBody), (this.params = params);
    this.debug = debug;
  }

  async get() {
    const response = await request(this.url)
      .get(`${this.url}${this.params}`)
      .set(this.reqHeader);
    return response;
  }
  async post() {
    const response = await request(this.url)
      .post(`${this.url}${this.params}`)
      .set(this.reqHeader)
      .send(this.reqBody);
    return response;
  }
  async patch() {
    const response = await request(this.url)
      .patch(`${this.url}${this.params}`)
      .set(this.reqHeader)
      .send(this.reqBody);
    return response;
  }
  async put() {
    const response = await request(this.url)
      .put(`${this.url}${this.params}`)
      .set(this.reqHeader)
      .send(this.reqBody);
    return response;
  }
  async delete() {
    const response = await request(this.url)
      .get(`${this.url}${this.params}`)
      .set(this.reqHeader);
    return response;
  }
}

const url = 'https://fakestoreapi.com/users';
const reqHeader = {};
const debug = false;
const req = new ApiHelper({
  url,
  reqHeader,
  debug,
});

console.log(req.get());
