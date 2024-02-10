import Notifications from "./NotificationInteface.js";

class EmailVerificationNotification {
    notifiable = null;
    subject = null;
    body = null;
    constructor(notifiable, subject,  body) {
        this.notifiable = notifiable;
        this.subject = subject;
        this.body = body;
    }
    via(channel) {
        const mailable = {
            email: this.notifiable,
            subject: this.subject,
            html: this.body,
        }
        switch(channel) {
            case 'viaEmail':
                return new Notifications().sendEmail(mailable);
            case 'viaSms':
                return;

        }
    }
}

export default EmailVerificationNotification;