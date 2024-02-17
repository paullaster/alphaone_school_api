import transporter from "../services/MailService.js";
import { mail } from '../../../config/index.js';

class Notifications {
    via(channel){}
    async sendEmail(mailable, ...args){
        const info = await transporter.sendMail({
            from: mail.from,
            to: mailable.email,
            subject: mailable.subject,
            html: mailable.html,
            ...args,
        });

        transporter.close();
        return info;
    };
    
}

export default Notifications;