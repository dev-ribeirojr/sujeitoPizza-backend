import prismaClient from '../../prisma';

// tipando type/interface
interface UserRequest {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {

    if (!email) {
      throw new Error('Email incorreto!');
    };

    // verificando se no banco existe o email
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });
    if (userAlreadyExists) {
      throw new Error('Email já cadastrado!');
    };

    // cadastrando usuário
    const user = await prismaClient.user.create({
      data: {
        // o que será criado
        name: name,
        email: email,
        password: password
      },
      select: {
        //o que quero devolver
        id: true,
        name: true,
        email: true
      }
    });


    return { user };
  }
}

export default new CreateUserService();