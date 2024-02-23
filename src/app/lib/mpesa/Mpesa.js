import Axios from '../axios/axios.js';
import { mpesa } from '../../../config/mpesa.js';
class Mpesa {
    /**
 * Get M-Pesa Token
 * @returns {string} access_token
 */
async getMpesaToken() {
  try {
    const joinedKeys = `${mpesa.consumer_key}:${mpesa.consumer_secret}`;
    const response = Axios._request(mpesa.authorization_url, {
      headers: {
        Authorization: `Basic ${new Buffer.from(joinedKeys).toString('base64')}`,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });
    return response.data.access_token;
  } catch (error) {
    return error.message;
  }
}
    async niPush(transaction) {
        try {
            const token = this.getMpesaToken();
            const body = {

            };
            const response = await Axios._request(mpesa.express_api_url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    shortcode: mpesa.shortcode,
                }
            }).catch(err => { });
            return response.data;
        } catch (error) {

        }
    }
    async password() {
        try {
            
        } catch (error) {
            
        }
    }
    async timeStamp() {
        try {
            
        } catch (error) {
            
        }
    }
}