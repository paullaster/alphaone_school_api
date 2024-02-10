import EmailVerificationNotification from "../../../notifications/EmailVerificationNotification.js";
import { application } from "../../../../../config/index.js";

class AuthController {

    login(req, res) {

    };
    async signup(req, res) {
        const mailSubject = "Email account verification";
        const mailBody = `
    <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 20px; color: #333">
    Hello, ${req.body.email}
  </p>
  <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 20px; color: #333">
    Please confirm your email address to unlock exclusive features and benefits.
  </p>
  <p style="margin: 0">
    <a href="${application.weburl}/getstarted/confirm" style="background-color: #007bff; border: none; border-radius: 5px; color: #fff; display: inline-block; font-family: sans-serif; font-size: 15px; font-weight: bold; line-height: 40px; padding: 10px 25px; text-align: center; text-decoration: none; vertical-align: middle;">Confirm Email Address</a>
  </p>
  <p style="font-family: sans-serif; font-size: 12px; color: #999; margin-top: 20px">
    You can also copy and paste this link into a new browser tab: <a href="${application.weburl}/getstarted/confirm" style="color: #999; text-decoration: none;">${application.weburl}/getstarted/confirm</a>
  </p>
  
    `;
        const notify = new EmailVerificationNotification(req.body.email, mailSubject, mailBody);
        const mail = await notify.via('viaEmail');
        res.send(mail);

    }
};

export default new AuthController;