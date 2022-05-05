import { IMailAdapter } from "../../adapters/mail-adapter";
import { IFeedbacksRepository } from "../feedbacks-repository";

interface ISubmitFeedbackUseCase {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(request: ISubmitFeedbackUseCase) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required!");
    }

    if (!comment) {
      throw new Error("comment is required!");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        "<div style='font-family: sans-serif; font-size: 16px; color: #111'>",
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}"> `,
        "</div>",
      ].join("\n"),
    });
  }
}
