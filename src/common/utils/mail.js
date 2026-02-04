import Mailgen from "mailgen";
import { Resend } from "resend";
import logger from "../logger/winston.logger.js";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 *
 * @param {{email: string; subject: string; mailgenContent: Mailgen.Content; }} options
 */
const sendEmail = async (options) => {
  // Initialize mailgen instance with a professional theme
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "LMS ERP",
      link: "https://lms-erp.com",
      // logo: "https://mailgen.js/img/logo.png", // You can add a logo here
    },
  });

  // Generate the plaintext version of the e-mail
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate an HTML email with the provided contents
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  try {
    const { data, error } = await resend.emails.send({
      from: "LMS ERP <onboarding@resend.dev>", // Default Resend test domain
      to: options.email,
      subject: options.subject,
      text: emailTextual,
      html: emailHtml,
    });

    if (error) {
      logger.error("Resend Error: ", error);
      return;
    }

    logger.info("Email sent successfully: ", data.id);
  } catch (error) {
    logger.error("Email service failed. Error: ", error);
  }
};

/**
 *
 * @param {string} username
 * @param {string} verificationUrl
 * @returns {Mailgen.Content}
 * @description It designs the email verification mail
 */
const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our LMS ERP platform! We're excited to have you on board.",
      action: {
        instructions:
          "To get started and secure your account, please verify your email address by clicking the button below:",
        button: {
          color: "#4F46E5", // Modern Indigo color
          text: "Verify Account",
          link: verificationUrl,
        },
      },
      outro:
        "If you did not create an account, no further action is required. Need help? Reply to this email.",
    },
  };
};

/**
 *
 * @param {string} username
 * @param {string} passwordResetUrl
 * @returns {Mailgen.Content}
 * @description It designs the forgot password mail
 */
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We received a request to reset your password for your LMS ERP account.",
      action: {
        instructions:
          "To reset your password, please click the button below. This link will expire shortly for security reasons.",
        button: {
          color: "#DC2626", // Alert red color
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "If you did not request a password reset, please ignore this email or contact support if you have concerns about your account security.",
    },
  };
};

/**
 *
 * @param {string} username
 * @param {{_id: string, product: {name: string, price: number}, quantity: number}[]} items
 * @param {number} totalCost
 * @returns {Mailgen.Content}
 * @description It designs the order creation invoice mail
 */
const orderConfirmationMailgenContent = (username, items, totalCost) => {
  return {
    body: {
      name: username,
      intro: "Your transaction has been processed successfully. Thank you for your payment!",
      table: {
        data: items?.map((item) => {
          return {
            item: item.product?.name,
            description: item.product?.description || "Fee Payment",
            price: "₹ " + item.product?.price,
            quantity: item.quantity,
          };
        }),
        columns: {
          customWidth: {
            item: "20%",
            price: "15%",
            quantity: "15%",
          },
          customAlignment: {
            price: "right",
            quantity: "right",
          },
        },
      },
      outro: [
        `Total Amount: ₹ ${totalCost}`,
        "You can view your full transaction history and download receipts from your dashboard.",
      ],
    },
  };
};

/**
 *
 * @param {string} username
 * @param {string} leaveType
 * @param {string} status
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} comment
 * @returns {Mailgen.Content}
 * @description It designs the leave status update mail
 */
const leaveStatusMailgenContent = (username, leaveType, status, startDate, endDate, comment) => {
  const isApproved = status.toLowerCase() === "approved";
  return {
    body: {
      name: username,
      intro: `Your leave request for ${leaveType} (${startDate} to ${endDate}) has been ${status.toUpperCase()}.`,
      dictionary: {
        Status: status.toUpperCase(),
        Type: leaveType,
        Period: `${startDate} to ${endDate}`,
        Remarks: comment || "No remarks provided.",
      },
      action: {
        instructions: "You can view the details of your leave application on the portal:",
        button: {
          color: isApproved ? "#10B981" : "#EF4444",
          text: "View Leave Details",
          link: "https://lms-erp.com/dashboard/leaves",
        },
      },
      outro: "If you have any questions, please contact the HR or Administrator.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  orderConfirmationMailgenContent,
  leaveStatusMailgenContent,
};
