/**
 *  Types: string, number, boolean, object...
 */

 //Interface á forma de definir um objeto de tipos.

interface TechObject {
  title: string,
  experience: number
}

interface CreateUserData {
  name?: string, //Interrogação na frente da variável indica que é opcional
  email: string,
  password: string,
  techs: Array<string | TechObject>
  // techs: [string] //Outra forma de declarar um array de string
}

export default function createUser({name = '', email, password}: CreateUserData) {
  const user = {
    name,
    email,
    password
  };

  return user;
}