import nodemailer from "nodemailer";
import { ISendMailData, IMailAdapter } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c547b9ff484c06",
    pass: "7cc5b5c135917b",
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ body, subject }: ISendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feeget.com>",
      to: "Victor Sousa <victorbrito001@gmail.com>",
      subject,
      html: body,
    });
  }
}
