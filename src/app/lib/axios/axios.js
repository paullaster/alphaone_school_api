import axios from 'axios';

class Axios {

constructor(baseURL, options = {}) {
    return axios.create({
        baseURL: baseURL,
    }).request(options);
}
}
export default Axios;
