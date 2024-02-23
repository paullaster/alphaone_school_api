import Axios from '../axios/axios.js';
import { mpesa } from '../../../config/mpesa.js';
import { application } from '../../../config/app.js';

class Mpesa {
   async getMpesaToken() {
        const joinedKeys = `${mpesa.consumer_key}:${mpesa.consumer_secret}`;
        const response = Axios._request(mpesa.authorization_url, {
            headers: {
                Authorization: `Basic ${new Buffer.from(joinedKeys).toString('base64')}`
            },
            params: {
                grant_type: 'client_credentials',
            }
        }).catch(err => {});
        return response.data.access_token;
    }
    async niPush() {
        const token = await this.getMpesaToken();
        const response = await Axios._request(mpesa.api_url, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                shortcode: mpesa.shortcode,
            }
        }).catch(err => {});
        return response.data;
    }
}