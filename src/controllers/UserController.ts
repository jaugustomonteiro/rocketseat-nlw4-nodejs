import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    // if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({ error: 'Validation Failed!' });
    // }

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User aready exists');
    }

    const user = usersRepository.create({
      name: name,
      email: email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }

  async findAll(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.status(200).json(users);
  }
}

export { UserController };
