import { Router } from "express";

import { SubmitFeedbackUseCase } from "./repositories/use-cases/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

const routes = Router();

routes.post("/feedbacks", async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  try {
    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });
    return response.status(201).send();
  } catch (error) {
    console.error(error);
  }
});

export { routes };
