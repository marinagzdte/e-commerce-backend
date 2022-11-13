import { createTransport } from "nodemailer";
import logger from "./logger.js";

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'mgonzalezdante@gmail.com',
        pass: 'ykbyjxbbrhrjepib'
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendMail = async (options) => {
    try {
        const info = await transporter.sendMail(options)
        logger.logInfo(info)
    } catch (error) {
        logger.logError(error)
    }
}