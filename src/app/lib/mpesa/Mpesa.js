import Axios from '../axios/axios.js';
import { mpesa } from '../../../config/mpesa.js';
class Mpesa {
   async getMpesaToken() {
        try {
            const joinedKeys = `${mpesa.consumer_key}:${mpesa.consumer_secret}`;
        const response = Axios._request(mpesa.authorization_url, {
            headers: {
                Authorization: `Basic ${new Buffer.from(joinedKeys).toString('base64')}`
            },
            params: {
                grant_type: 'client_credentials',
            }
        });
        return response.data.access_token;
        } catch (error) {
            return error;
        }
    }
    async niPush(transaction) {
        const token = await this.getMpesaToken();
        const body = {

        };
        const response = await Axios._request(mpesa.express_api_url, {
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