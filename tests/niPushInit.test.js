import { Application } from '../../../models/Application';
import { Mpesa } from '../../../lib/mpesa/Mpesa';
import PaymentsController from '../../../controllers/PaymentsController';

describe('PaymentsController', () => {
  describe('niPushInit', () => {
    test('should return an error if the application cannot be found', async () => {
      // Mock the findOne method of the Application model
      jest.spyOn(Application, 'findOne').mockImplementation(() => {
        return null;
      });

      const res = {
        ApiResponse: {
          error: jest.fn(),
        },
      };

      const controller = new PaymentsController();
      await controller.niPushInit({}, res);

      expect(res.ApiResponse.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'We cannot find this application',
          statusCode: 404,
        }),
      );
    });

    test('should return an error if the application balance is less than 1', async () => {
      // Mock the findOne method of the Application model
      jest.spyOn(Application, 'findOne').mockImplementation(() => {
        return {
          balance: 0,
        };
      });

      const res = {
        ApiResponse: {
          error: jest.fn(),
        },
      };

      const controller = new PaymentsController();
      await controller.niPushInit({}, res);

      expect(res.ApiResponse.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'This application has been fully paid',
          statusCode: 400,
        }),
      );
    });

    test('should initiate the NIPUSH transaction', async () => {
      // Mock the findOne method of the Application model
      jest.spyOn(Application, 'findOne').mockImplementation(() => {
        return {
          balance: 1,
        };
      });

      // Mock the mpesa.niPush method
      jest.spyOn(Mpesa.prototype, 'niPush').mockImplementation(() => {
        return 'pay';
      });

      const res = {
        ApiResponse: {
          success: jest.fn(),
        },
      };

      const controller = new PaymentsController();
      const pay = await controller.niPushInit({}, res);

      expect(res.ApiResponse.success).toHaveBeenCalledWith(
        expect.objectContaining({
          pay: 'pay',
        }),
        200,
      );
    });
  });
});