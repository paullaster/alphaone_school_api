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
        switch(channel) {
            case 'viaEmail':
                return new Notifications().sendEmail()

        }
    }
}