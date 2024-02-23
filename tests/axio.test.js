import Axios from './Axios';
import MockAdapter from 'axios-mock-adapter';

describe('Axios', () => {
  let axios;
  let mockAdapter;

  beforeEach(() => {
    mockAdapter = new MockAdapter(Axios);
    axios = new Axios();
  });

  afterEach(() => {
    mockAdapter.restore();
  });

  describe('request', () => {
    it('should create an instance of axios with the given base URL', () => {
      const baseURL = 'https://example.com';
      const options = {};

      mockAdapter.onGet('/test').reply(200);

      axios._request(baseURL, options);

      expect(axios.instance.defaults.baseURL).toBe(baseURL);
      expect(axios.instance.defaults.headers.common['Content-Type']).toBe('application/json');
    });
  });
});