import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      //não existe usuário
      throw new Error("user/password incorrect");
    }

    //verificar se a senha está correta
    /**
     * @param {senha digitada pelo usuário} password
     * @param {hash no banco de dados, que pode ser acessada pelo user que é o usuário ja encontrado no banco de dados } user.password
     */
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      //senha errada
      throw new Error("user/password incorrect");
    }

    //gerar um tokem JWT e devolver os dados do usuário

    return { ok: true };
  }
}

export { AuthUserService };
