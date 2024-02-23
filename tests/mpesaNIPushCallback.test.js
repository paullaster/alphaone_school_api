import { Application } from '../../../models/Application';
import { Transaction } from '../../../models/Transaction';
import { sequelize } from '../../../models/index';
import supertest from 'supertest';
import app from '../../../app';

const request = supertest(app);

describe('PaymentsController', () => {
  describe('mpesaNIPushCallback', () => {
    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });

    afterEach(async () => {
      await sequelize.close();
    });

    it('should return an error if the transaction cannot be found', async () => {
      const stkCallback = {
        MerchantRequestID: 'test',
        CheckoutRequestID: 'test',
        ResultCode: 0,
        ResultDesc: 'test',
        CallbackMetadata: [
          {
            Key: 'Amount',
            Value: '100',
          },
        ],
      };
      const response = await request
        .post('/mpesa/ni-push-callback')
        .send({ Body: stkCallback });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'We can not find this transaction',
        statusCode: 404,
      });
    });

    it('should return an error if the application cannot be found', async () => {
      const transaction = await Transaction.create({
        merchantRequestID: 'test',
        checkoutRequestID: 'test',
        status: 'pending',
        amount: 100,
      });
      const stkCallback = {
        MerchantRequestID: 'test',
        CheckoutRequestID: 'test',
        ResultCode: 0,
        ResultDesc: 'test',
        CallbackMetadata: [
          {
            Key: 'Amount',
            Value: '100',
          },
        ],
      };
      const response = await request
        .post('/mpesa/ni-push-callback')
        .send({ Body: stkCallback });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'We can not find this application',
        statusCode: 404,
      });
    });

    it('should return an error if the transaction is unsuccessful', async () => {
      const transaction = await Transaction.create({
        merchantRequestID: 'test',
        checkoutRequestID: 'test',
        status: 'pending',
        amount: 100,
      });
      const application = await Application.create({
        id: 'test',
        balance: 100,
      });
      const stkCallback = {
        MerchantRequestID: 'test',
        CheckoutRequestID: 'test',
        ResultCode: 1,
        ResultDesc: 'test',
        CallbackMetadata: [
          {
            Key: 'Amount',
            Value: '100',
          },
        ],
      };
      const response = await request
        .post('/mpesa/ni-push-callback')
        .send({ Body: stkCallback });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'test',
        statusCode: 400,
      });
    });

    it('should update the transaction and return the updated application if the transaction is successful', async () => {
      const transaction = await Transaction.create({
        merchantRequestID: 'test',
        checkoutRequestID: 'test',
        status: 'pending',
        amount: 100,
      });
      const application = await Application.create({
        id: 'test',
        balance: 100,
      });
      const stkCallback = {
        MerchantRequestID: 'test',
        CheckoutRequestID: 'test',
        ResultCode: 0,
        ResultDesc: 'test',
        CallbackMetadata: [
          {
            Key: 'Amount',
            Value: '100',
          },
          {
            Key: 'TransactionID',
            Value: 'test',
          },
          {
            Key: 'TransactionDate',
            Value: 'test',
          },
        ],
      };
      const response = await request
        .post('/mpesa/ni-push-callback')
        .send({ Body: stkCallback });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Application has been successfully paid',
        statusCode: 201,
        data: {
          id: 'test',
          balance: 0,
          payment: 'Paid',
          status: 'In progress',
        },
      });
    });
  });
});