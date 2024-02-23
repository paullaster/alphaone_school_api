import axios from 'axios';

class Axios {
    /**
 * Creates a new instance of Axios with the given configuration.
 * @param {string} baseURL - The base URL for all requests.
 * @param {AxiosRequestConfig} [options] - The options for the Axios instance.
 * @returns {Axios} The new Axios instance.
 */
async _request(baseURL, options = {}) {
    return axios.create({
        baseURL: baseURL,
        ...options,
    });
}
}
export default new Axios();
