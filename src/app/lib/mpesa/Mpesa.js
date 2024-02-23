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
            const stringToEncode = mpe
        } catch (error) {
            return error.message;
        }
    }
    /**
 * Returns a timestamp in the format YYYYMMDDhhmmss
 * @returns {string} timestamp
 */
async timeStamp() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    const day = now.getDate() <  10 ? '0' + (now.getDate()) : now.getDate();
    const hour = now.getHours() < 10 ? '0' + (now.getHours()) : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + (now.getMinutes()) : now.getMinutes(); 
    const second = now.getSeconds() < 10 ? '0' + (now.getSeconds()) : now.getSeconds(); 
    return `${year}${month}${day}${hour}${minute}${second}`;
  } catch (error) {
    return error.message;
  }
}
}