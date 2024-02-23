import Axios from '../axios/axios.js';
import { mpesa } from '../../../config/mpesa.js';

class Mpesa {
   async getMpesaToken() {
        const joinedKeys = `${mpesa.consumer_key}:${mpesa.consumer_secret}`;
        const response = await Axios._request(mpesa.authorization_url, {
            headers: {
                Authorization: `Basic ${new Buffer.from(joinedKeys).toString('base64')}`
            },
            params: {
                grant_type: 'client_credentials',
            }
        })
    }
}