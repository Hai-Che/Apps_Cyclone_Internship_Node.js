import { Queue, Worker } from "bullmq";
import nodemailer from "nodemailer";
import "dotenv/config";

const emailQueue = new Queue("emailQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mocung9723@gmail.com",
    pass: process.env.NODEMAILER_APP_PASS,
  },
});

const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, subject, text } = job.data;

    const mailOptions = {
      from: "mocung9723@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

export { emailQueue };
