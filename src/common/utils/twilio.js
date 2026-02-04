import twilio from "twilio";
import logger from "../logger/winston.logger.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

let client;
try {
    if (accountSid && accountSid.startsWith("AC") && authToken) {
        client = twilio(accountSid, authToken);
    } else {
        logger.warn("Twilio credentials are missing or invalid. SMS functionality will be disabled.");
    }
} catch (error) {
    logger.error("Error initializing Twilio client:", error.message);
}

/**
 * 
 * @param {string} to - The recipient's phone number (including country code)
 * @param {string} body - The message content
 * @returns {Promise<any>}
 */
const sendSMS = async (to, body) => {
    try {
        if (!client) {
            logger.warn("Twilio client not initialized. Cannot send SMS.");
            return null;
        }
        const message = await client.messages.create({
            body,
            from: phoneNumber,
            to,
        });
        logger.info(`SMS sent successfully to ${to}. SID: ${message.sid}`);
        return message;
    } catch (error) {
        logger.error(`Failed to send SMS to ${to}. Error: ${error.message}`);
        // If credentials are placeholders, don't throw error in dev mode to avoid crashing
        if (process.env.NODE_ENV === "development") {
            logger.warn("Twilio SMS failed. Check your credentials in .env");
            return null;
        }
        throw error;
    }
};

/**
 * 
 * @param {string} to - Recipient phone number
 * @param {string} otp - The OTP to send
 */
const sendVerificationOTP = async (to, otp) => {
    const body = `Your verification code is: ${otp}. Please do not share this with anyone.`;
    return await sendSMS(to, body);
};

/**
 * 
 * @param {string} to 
 * @param {string} content 
 */
const sendImportantMessage = async (to, content) => {
    return await sendSMS(to, content);
};

export { sendSMS, sendVerificationOTP, sendImportantMessage };
