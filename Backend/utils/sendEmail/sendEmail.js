// Import Third-Party npm packages.
import nodemailer from "nodemailer";

// Import Environment Variables.
import config from "../../config/index.js";

// Send email with code to user for verification.
const sendEmail = async ({ emailTo, subject, data, content }) => {
  try {
    // SMTP transporter.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // Sender.
      auth: {
        user: config.keys.senderEmail, // Sender Email.
        pass: config.keys.senderEmailPass, // Sender Email Password.
      },
    });

    // Email content.
    await transporter.sendMail({
      from: `"My App" <${config.keys.senderEmail}>`, // Sender Data("My App").
      to: emailTo,
      subject,
      html: `
                <div>
                <h3>Use the code below to ${content}</h3>
                <p><strong>Code:</strong> ${data}</p>
                </div>
            `,
    });
  } catch (error) {
    next(new Error("Unable to send Email!"));
  }
};

export default sendEmail;
