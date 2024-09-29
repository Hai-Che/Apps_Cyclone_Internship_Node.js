"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const bullmq_1 = require("bullmq");
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const emailQueue = new bullmq_1.Queue("emailQueue", {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
exports.emailQueue = emailQueue;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "mocung9723@gmail.com",
        pass: process.env.NODEMAILER_APP_PASS,
    },
});
const worker = new bullmq_1.Worker("emailQueue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, text } = job.data;
    const mailOptions = {
        from: "mocung9723@gmail.com",
        to: email,
        subject: subject,
        text: text,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    }
    catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
    }
}), {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
//# sourceMappingURL=emailQueue.js.map