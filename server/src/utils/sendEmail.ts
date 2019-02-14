import Mailgun from "mailgun-js";

const mailgunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAILGUN_DOMAIN || ""
});

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "ksc2601@gmail.com",
        to: "ksc2601@gmail.com",
        subject,
        html
    };
    return mailgunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello~ ${fullName}, please verify you email`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}"/>here</a>`;
    return sendEmail(emailSubject, emailBody);
};
