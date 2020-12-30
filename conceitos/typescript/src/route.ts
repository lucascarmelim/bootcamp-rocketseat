import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {

  // const user = createUser('Lucas','lucas@gmail.com','123456');
  const user = createUser({
    name: 'Lucas',
    email: 'lucas@gmail.com',
    password: '123456',
    techs: [
      'Node.js',
      'ReactJS',
      'React Native',
      { title: 'Javascript', experience: 50 },
      { title: 'Node.js', experience: 40 },
    ]
  });

  console.log(user.name);

  return response.json({ message: 'Hello World' });
}
