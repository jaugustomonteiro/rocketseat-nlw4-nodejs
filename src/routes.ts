import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();

// USERS
router.post('/users', userController.create);
router.get('/users', userController.findAll);

//SURVEYS
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

// SURVEYS_USERS
router.post('/send', sendMailController.execute);

export { router };
