import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
    index (request: Request, response: Response) {
        return response.send({ user_id: request.user_id});
    }

    async store(request: Request, response: Response) {
        const repository = getRepository(User);
        const  { name, email, password } = request.body;

        const userExists = await repository.findOne({ where: { email }});

        if (userExists) {
            return response.sendStatus(409);
        }

        const user = repository.create({ name, email, password });
        await repository.save(user);

        return response.json(user);
    }    
}

export default new UserController();