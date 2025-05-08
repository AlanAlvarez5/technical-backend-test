import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../utils/middleware/validate';

import UserCreator from '../../context/user/userCreated/application/UserCreator';
import { signToken } from '../../utils/jwt/jwt';
import CreateUserAuraDBRepository from '../../context/user/userCreated/infrastructure/repository/CreateUserAuraDBRepository';
import FindUserAuraDBRepository from '../../context/user/userLoggedIn/infrastructure/repository/FindUserAuraDBRepository';
import UserAuthenticator from '../../context/user/userLoggedIn/application/UserAuthenticator';


const router = Router();

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post(
  '/signup',
  validate({ body: createUserSchema }),
  async (req, res) => {

    const userRepository = new CreateUserAuraDBRepository();
    const userCreator = new UserCreator(userRepository);
    const { id, email, name } = await userCreator.createUser(req.body);

    const user = {
      id,
      email,
      name
    };

    const token = signToken(user);

    res.json({
      user,
      token
    });
  }
);

router.post(
  '/login',
  validate({ body: loginUserSchema }),
  async (req, res) => {

    const userRepository = new FindUserAuraDBRepository();
    const userAuthenticator = new UserAuthenticator(userRepository);
    const userAuthenticated = await userAuthenticator.authenticate(req.body);

    const user =  {
      id: userAuthenticated.id,
      email: userAuthenticated.email,
      name: userAuthenticated.name
    };

    const token = signToken(user);

    res.json({
      user,
      token
    });
  }
);

export default router;