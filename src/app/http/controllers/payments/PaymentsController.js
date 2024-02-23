import { Application } from '../../../models/Application';
import { Transaction } from '../../../models/Transaction';


class PaymentsController {
    async mpesaNIPushCallback(req, res) {
        try {
            const stkCallback = req.body.Body.stkCallback;
            if (stkCallback.ResultCode > 0 ) {
                const transaction = await Transaction.findOne({
                    where: {
                        merchantRequestID: stkCallback.MerchantRequestID,
                        checkoutRequestID: stkCallback.CheckoutRequestID,
                    },
                });
                transaction.destroy();
                res.ApiResponse.error(transaction, stkCallback.ResultDesc, stkCallback.ResultCode);
            }
            const transaction = await Transaction.findOne({
                where: {
                    merchantRequestID: stkCallback.MerchantRequestID,
                    checkoutRequestID: stkCallback.CheckoutRequestID,
                },
            });
            if (!transaction) {
                res.ApiResponse.error(transaction, 'We can not find this transaction', 404);
            }
            transaction.transactionMessage = stkCallback.ResultDesc;
            transaction.status = 'Settled';
            transaction.transactionDate = stkCallback.CallbackMetadata[2].Value;
            transaction.amount = stkCallback.CallbackMetadata[0].Value;
            transaction.transactionID = stkCallback.CallbackMetadata[1].Value;
            transaction.phoneNumber = stkCallback.CallbackMetadata[3].Value;
            const updatedTransaction = await transaction.save();

            const application = await Application.findOne({
                where: {
                    id: updatedTransaction.applicationCode,
                },
            });
            if (!application) {
                res.ApiResponse.error(application, 'We can not find this application', 404);
            }
            application.payment = 'Paid';
            application.status = 'In progress';
            const paidApplication = await application.save();
            res.ApiResponse.success(paidApplication, 201, 'Application has been successfully piad');
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
}