import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm'
// import { hash } from 'bcryptjs'

import User from "../models/User";

interface Request {
  email: string,
  password: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: {email} });

    if (!user) {
      throw new Error(('Incorrect email/password combination.'));
    }

    //user.password - É a senha criptografada
    // password - Senha criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error(('Incorrect email/password combination.'));
    }

    //Se chegou até aqui, usuário autenticado
    return {
      user
    }
  }
}

export default AuthenticateUserService;