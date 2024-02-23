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
            const transaction = Transaction.findOne({
                where: {
                    merchantRequestID: stkCallback.MerchantRequestID,
                    checkoutRequestID: stkCallback.CheckoutRequestID,
                }
            })
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
}