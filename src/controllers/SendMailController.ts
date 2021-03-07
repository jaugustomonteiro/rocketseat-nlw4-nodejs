import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRespository';
import { SurveysUserRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveyUserRepository = getCustomRepository(SurveysUserRepository);

    const userAlreadExists = await usersRepository.findOne({ email });
    if (!userAlreadExists) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    const survey = await surveyRepository.findOne({ id: survey_id });
    if (!survey) {
      return response.status(400).json({ error: 'Survey does not exists' });
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadExists.id,
      survey_id,
    });

    await surveyUserRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, survey.description);

    return response.json(surveyUser);
  }
}

export { SendMailController };
