import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  const userAuth = {
    name: user.name,
    email: user.email
  }

  return response.json({ userAuth, token });

})

export default sessionsRouter;