import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUserRepository } from '../repositories/SurveysUsersRepository';

class NPSController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const surveysUsers = await surveysUserRepository.find({
      survey_id,
      id: Not(IsNull()),
    });

    const totalAnswers = surveysUsers.length;
    const detractor = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6).length;

    const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10).length;
    const passive = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8).length;

    const nps = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

    return response.json({
      totalAnswers,
      detractor,
      promoters,
      passive,
      nps,
    });
  }
}

export { NPSController };
