import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

// tipando type/interface
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Email incorreto!");
    }

    // verificando se no banco existe o email
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("Email já cadastrado!");
    }

    // criptografando senha, antes de cadastrar

    /**
     * @param {senha que será criptografada} password
     * @param {salto de criptografia} 8
     */
    const passwordHash = await hash(password, 8);

    // cadastrando usuário
    const user = await prismaClient.user.create({
      data: {
        // o que será criado
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        //o que quero devolver
        id: true,
        email: true,
        name: true,
        role: true,
        updated_at: true,
        created_at: true,
        status: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
