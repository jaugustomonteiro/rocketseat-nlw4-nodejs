import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NPSController } from './controllers/NPSController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NPSController();

// USERS
router.post('/users', userController.create);
router.get('/users', userController.findAll);

//SURVEYS
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

// SURVEYS_USERS
router.post('/sendMail', sendMailController.execute);

// ANSWERS
router.get('/answers/:value', answerController.execute);

// NPS
router.get('/nps/:survey_id', npsController.execute);

export { router };
