import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import User from "../models/User";

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
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

    const token = sign({}, '0160b1e60edca359008f9f09e74e5391', {
      subject: user.id,
      expiresIn: '1d'
    })

    //Se chegou até aqui, usuário autenticado
    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;