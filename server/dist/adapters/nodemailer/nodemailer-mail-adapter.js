"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c547b9ff484c06",
        pass: "7cc5b5c135917b",
    },
});
class NodemailerMailAdapter {
    async sendMail({ body, subject }) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feeget.com>",
            to: "Victor Sousa <victorbrito001@gmail.com>",
            subject,
            html: body,
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
