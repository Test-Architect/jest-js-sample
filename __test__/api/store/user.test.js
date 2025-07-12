const testData = require('@dataTest/testData.json');
const { getTokenLogin } = require('@srcApi/store/auth');
const {
  users,
  addUser,
  updateUser,
  deleteUser,
} = require('@srcApi/store/user.js');

describe.skip('Test url api /user', () => {
  let authToken = '';
  beforeAll(async () => {
    const res = await getTokenLogin();
    console.log(res);
    authToken = res;
  });
  test('Get all users', async () => {
    console.log(authToken, 'token');
    const response = await users({
      reqHeader: { token: authToken },
      reqBody: {},
      params: '',
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body[0]).toContainKeys(['email', 'name', 'id']);
  });
  test('Get a single user', async () => {
    const response = await users({
      reqHeader: { token: authToken },
      params: '/3',
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body.id).toBe(3);
    expect(body).toContainKeys(['email', 'name', 'id']);
  });

  test('Add a new user', async () => {
    const sendBody = {
      id: 0,
      email: 'test@test.com',
      username: 'johnd',
      password: 'm38rmF$',
    };
    const response = await addUser({
      reqHeader: { token: authToken },
      reqBody: sendBody,
      debug: false,
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body).toHaveProperty('id');
    // expect(body.email).toBe('test@test.com');
    // expect(body).toContainKeys(['email', 'name', 'id']);
  });
  test('Update a users', async () => {
    const sendBody = {
      email: 'test@test.com',
      username: 'johnd',
      password: 'm38rmF$',
      name: {
        firstname: 'John',
        lastname: 'Doe',
      },
      address: {
        city: 'kilcoole',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
      },
      phone: '1-570-236-7033',
    };
    const response = await updateUser({
      reqHeader: { token: authToken },
      reqBody: sendBody,
      params: '/7',
    });
    const { body } = response;
    expect(response.status).toBe(200);
    // expect(body.id).toBe(7);
    expect(body.email).toBe('test@test.com');
    // expect(body).toContainKeys(['email', 'name', 'id']);
  });
  test('Delete a user', async () => {
    const response = await deleteUser({
      reqHeader: { token: authToken },
      params: '/7',
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body.id).toBe(7);
    expect(body.email).toBe('miriam@gmail.com');
    // expect(body).toContainKeys(['email', 'name', 'id']);
  });
});
