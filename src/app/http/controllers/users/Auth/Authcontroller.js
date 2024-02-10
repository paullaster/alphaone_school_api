import EmailVerificationNotification from "../../../notifications/EmailVerificationNotification.js";
import { application } from "../../../../../config/index.js";

class AuthController {

   login(req, res) {

   };
   async signup(req, res) {
    const mailSubject = "Email account verification";
    const mailBody = `
    <p> Hello, ${ req.body.email } </p>
    <p> Please click the link below to confirm your email</p>
    <p><a href=${application.weburl}>Confirm Email Address </a></p>
    `
    const notify = new EmailVerificationNotification(req.body.email, mailSubject, mailBody);
    const mail = await notify.via('viaEmail');
    res.send(mail);

   }
};

export default new AuthController;