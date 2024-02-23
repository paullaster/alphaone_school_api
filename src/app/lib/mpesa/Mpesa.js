import Axios from '../axios/axios.js';
import { mpesa } from '../../../config/mpesa.js';
import { Transaction } from '../../models/Transaction.js';
import { Course } from '../../models/Course.js';
import { Application } from '../../models/Application.js';
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
    /**
 * Submits a transaction to the M-Pesa Express API
 * @param {object} transaction the transaction details
 * @param {string} transaction.phonenumber the phone number of the recipient
 * @param {number} transaction.Amount the amount to be transacted
 * @param {string} transaction.TransactionType the type of transaction
 * @param {string} [transaction.TransactionDesc] a description of the transaction
 * @returns {object} the M-Pesa Express API response
 */
async niPush(transaction, applicationCode = 0) {
  try {
    const token = this.getMpesaToken();
    const body = {
      BusinessShortCode: mpesa.business_shortcode,
      Password: this.password,
      Timestamp: this.timeStamp,
      TransactionType: transaction.TransactionType,
      Amount: transaction.Amount,
      PartyA: this.formatPhoneNumber(transaction.phonumber),
      PartyB: mpesa.business_shortcode,
      PhoneNumber: this.formatPhoneNumber(transaction.phonumber),
      CallBackURL: mpesa.mpesa_callback,
      TransactionDesc: transaction.TransactionDesc
    };
    if (transaction.TransactionType !== 'CustomerBuyGoodsOnline') {
      body.AccountReference = this.generateAccountNumber();
    }
    const response = Axios._request(mpesa.express_api_url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: body,
      method: 'POST'
    });
    if (response.data.ResponseCode < 1) {
        const application = await Application.findOne({where:{id : applicationCode}});
        const course = await Course.findOne({where:{ id: application.course}});

      await Transaction.create({
        id: body.AccountReference ? body.AccountReference : this.generateAccountNumber(),
        phoneNumber: transaction.phonumber,
        amount: transaction.Amount,
        status: 'Pending',
        checkoutRequestID: response.data.CheckoutRequestID,
        merchantRequestID: response.data.MerchantRequestID,
        transactionMessage: response.data.ResponseDescription,
        balance: course.price
      });
      return response.data;
    }
    throw new Error(JSON.stringify(response.data));
  } catch (error) {
    return error;
  }
}
    /**
 * Returns a base64 encoded string of the M-Pesa password
 * @returns {string} base64 encoded M-Pesa password
 */
async password() {
  try {
    const stringToEncode = mpesa.business_shortcode + mpesa.mpesa_passkey + this.timeStamp;
    return new Buffer.from(stringToEncode).toString('base64');
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
/**
 * Generates a unique M-Pesa account number
 * @returns {string} the generated account number
 */
async generateAccountNumber() {
  "use strict";

  try {
    const codes = (await Transaction.findAll({attributes: ['id']})).map(transaction => transaction.id);
    // create a set to store the generated codes
    const generatedCodes = new Set(codes);

    // set the initial account prefix to 'aaaa'
    let prefix = "aaaa";

    // create arrays of allowed letters and digits
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";

    // loop until a unique account number is generated
    while (true) {
      // initialize the number of remaining characters to 8
      let remainingChars = 8;

      // create an array of available characters based on the remaining number of characters
      let availableChars = [...letters, ...digits];

      // create an array to store the randomly generated characters
      const randomChars = [];

      // initialize the digit count to 0
      let digitCount = 0;

      // loop until all remaining characters have been added to the random characters array
      while (remainingChars > 0) {
        // generate a random index for an available character
        const randomIndex = Math.floor(Math.random() * availableChars.length);

        // get the character at the random index
        const char = availableChars[randomIndex];

        // check if the character is a digit
        if (!isNaN(char)) {
          // increment the digit count
          digitCount++;

          // if the digit count is greater than 3, skip this iteration
          if (digitCount > 3) continue;

          // add the character to the random characters array at a random index
          randomChars.splice(
            Math.floor(Math.random() * randomChars.length),
            0,
            char
          );
        }
        // if the digit count is 0 and there are only 1 or fewer remaining characters, skip this iteration
        else if (digitCount === 0 && remainingChars <= 1) continue;
        // otherwise, add the character to the random characters array
        else randomChars.push(char);

        // remove the character from the available characters array
        availableChars.splice(randomIndex, 1);

        // decrement the remaining character count
        remainingChars--;
      }

      // create the account number from the random characters and the prefix
      const code = prefix + randomChars.join("");

      // check if the generated code is unique
      if (!generatedCodes.has(code)) {
        // add the generated code to the set
        generatedCodes.add(code);

        // return the generated code
        return code.toUpperCase();
      }

      // if no unique codes could be generated, increment the prefix and try again
      if (availableChars.length === 0) {
        prefix = this.incrementPrefix(prefix);
      }
    }
  } catch (error) {
    return error.message;
  }
}

/**
 * Increments the prefix of an M-Pesa account number
 * @param {string} prefix the current prefix of the account number
 * @returns {string} the incremented prefix
 */
incrementPrefix = (prefix) => {
  const lastCharCode = prefix.charCodeAt(2) + 1;
  if (lastCharCode <= 122) {
    return prefix.slice(0, 2) + String.fromCharCode(lastCharCode);
  } else {
    const secondCharCode = prefix.charCodeAt(1) + 1;
    if (secondCharCode <= 122) {
      return prefix[0] + String.fromCharCode(secondCharCode) + "a";
    } else {
      return String.fromCharCode(prefix.charCodeAt(0) + 1) + "aa";
    }
  }
}
}