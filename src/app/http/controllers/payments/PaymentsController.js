import { Application } from '../../../models/Application.js';
import { Transaction } from '../../../models/Transaction.js';
import { Mpesa } from '../../../lib/mpesa/Mpesa.js';


class PaymentsController {
    /**
     * Handles the initial NIPUSH request from the client.
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     */
    async niPushInit(req, res) {
        try {
            // If the request body is empty, return an error response with a status code of 400 (Bad Request)
            if (!req.body) {
                res.ApiResponse.error(req.body, 'Missing body', 400);
            }
            // Destructure the request body
            const { applicationCode, ...transaction } = req.body;

            // Find the application based on the application code
            const application = await Application.findOne({ where: { id: applicationCode } });

            // Check if the application exists
            if (!application) {
                res.ApiResponse.error(application, 'We cannot find this application', 404);
            }

            // Check if the application balance is less than 1
            if (application.balance < 1) {
                res.ApiResponse.error(application, 'This application has been fully paid', 400);
            }

            // If the transaction amount is less than 1, return an error response with a status code of 400 (Bad Request)
            if (transaction.Amount < 1) {
                res.ApiResponse.error(transaction, 'Invalid amount', 400);
            }
            // Create a new M-Pesa instance
            const mpesa = new Mpesa();
            // console.log(mpesa.niPush(transaction, applicationCode))
            //Initiate the NIPUSH transaction
            mpesa.niPush(transaction, applicationCode)
                .then((pay) => {
                    // Return a success response to the client
                    res.ApiResponse.success(pay, 200);
                })
                .catch((error) => {
                    // Return an error response to the client
                    res.ApiResponse.error(error);
                });

        } catch (error) {
            // Return an error response to the client
            res.ApiResponse.error(error);
        }
    }
    /**
 * Handles M-Pesa NIPUSH Callbacks
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
    async mpesaNIPushCallback(req, res) {
        try {
            // If the request body is empty, return an error response with a status code of 400 (Bad Request)
            if (!req.body) {
                res.ApiResponse.error(req.body, 'Missing body', 400);
            }
            const stkCallback = req.body.Body.stkCallback;
            const transaction = await Transaction.findOne({
                where: {
                    merchantRequestID: stkCallback.MerchantRequestID,
                    checkoutRequestID: stkCallback.CheckoutRequestID,
                },
            });
            /**
             * If the result code is greater than 0, it means that the transaction was unsuccessful.
             * In this case, we delete the transaction from the database and return an error to the client.
             */
            if (stkCallback.ResultCode > 0) {
                transaction.destroy();
                res.ApiResponse.error(transaction, stkCallback.ResultDesc, stkCallback.ResultCode);
            }
            /**
             * If the transaction cannot be found, it means that the transaction does not exist.
             * In this case, we return an error to the client.
             */
            if (!transaction) {
                res.ApiResponse.error(transaction, 'We can not find this transaction', 404);
            }
            /**
             * Update the transaction with the information from the M-Pesa callback.
             * This includes the transaction message, status, amount, transaction ID, and phone number.
             */
            transaction.transactionMessage = stkCallback.ResultDesc;
            transaction.status = 'Settled';
            transaction.transactionDate = stkCallback.CallbackMetadata.Item[2].Value;
            transaction.amount = stkCallback.CallbackMetadata.Item[0].Value;
            transaction.transactionID = stkCallback.CallbackMetadata.Item[1].Value;
            transaction.phoneNumber = stkCallback.CallbackMetadata.Item[3].Value;
            const updatedTransaction = await transaction.save();

            const application = await Application.findOne({
                where: {
                    id: updatedTransaction.applicationCode,
                },
            });
            /**
             * If the application cannot be found, it means that the application does not exist.
             * In this case, we return an error to the client.
             */
            if (!application) {
                res.ApiResponse.error(application, 'We can not find this application', 404);
            }
            /**
             * Update the application balance and payment status based on the transaction amount.
             * If the balance is zero, set the payment status to "Paid". Otherwise, set it to "Partially Paid".
             */
            application.balance = ((application.balance) - (updatedTransaction.amount));
            application.payment = application.balance === 0 ? 'Paid' : 'Partially Paid';
            application.status = 'In progress';
            const paidApplication = await application.save();
            /**
             * Return a success response to the client with the updated application.
             */
            res.ApiResponse.success(paidApplication, 201, 'Application has been successfully paid');
        } catch (error) {
            /**
             * Return an error response to the client if an error occurs.
             */
            res.ApiResponse.error(error);
        }
    }
}

export default new PaymentsController();