import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
    const token = sign(
      //payload dados a serem incluidos no token
      {
        name: user.name,
        email: user.email,
      },
      //chave secreta para assinar o token de verificação
      process.env.JWT_SECRET!,
      //algoritmos de assinatura
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
