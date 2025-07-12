const testData = require('@dataTest/testData.json');
const { getTokenLogin } = require('@srcApi/store/auth.js');
const {
  products,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('@srcApi/store/product.js');

describe.skip('Test url api /product', () => {
  let authToken = '';
  beforeAll(async () => {
    const res = await getTokenLogin();
    authToken = res;
  });
  test('Get all products', async () => {
    const response = await products({
      reqHeader: { token: authToken },
      reqBody: {},
      params: '',
      // debug: true,
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body[0].id).toBe(1);
    expect(body[0]).toContainKeys(['id', 'title', 'price']);

    // expect(body.xxx).toBe('xxx');
  });
  test('Add new product', async () => {
    const sendBody = {
      title: 'sepatu',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
    };
    const response = await addProduct({
      reqHeader: { token: authToken },
      reqBody: sendBody,
      // debug: true,
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body.id).toBe(21);
    expect(body.title).toBe('sepatu');
    expect(body).toContainKeys(['id', 'title', 'price']);

    // expect(body.xxx).toBe('xxx');
  });
});
