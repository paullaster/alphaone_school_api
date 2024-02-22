import axios from 'axios';

class Axios {
    constructor(baseURL, options = {}) {
        this._request = axios.create({
            baseURL: baseURL,
            ...options,
        });
    }
}
// export const _request = axios.create({
//     baseURL: APIBASEURL,
// });


// const requestInterceptor = (config) => {
//     // if (AuthService.check()) {
//         // config.headers.Authorization = `Bearer ${AuthService.Token()}`;
//         if (!config.headers.Accept && !config.headers['Content-Type'])config.headers['Content-Type'] = "Application/json" 
//     // }
//     config.validateStatus = function (status) {
//         return status >= 200 && status < 300;
//     };
//     return config;
// }

// const errorInterceptor = (error) => {
// 	console.log("ERROR INTERCEPTOR", error);
// 	return Promise.reject(error);
// };

// _request.interceptors.request.use(requestInterceptor, errorInterceptor);


// const reponseInterceptor = (response) => {
// 	return Promise.resolve(response?.data);
// };

// _request.interceptors.response.use(reponseInterceptor, errorInterceptor);