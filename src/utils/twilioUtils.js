import twilio from "twilio";
import logger from "./logger.js";

const accountSid = 'ACb4c2bd982fc62ee9dc71d79416f50629';
const authToken = '8f517d3b1cd4c8e7137557dc08fc5e80';
const client = twilio(accountSid, authToken);

export const sendMessage = (text, to) => {
    client.messages
        .create({
            body: text,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${to}`
        })
        .then(sms => logger.logInfo(`Mensaje enviado: ${sms.sid}`))
        .done();
}