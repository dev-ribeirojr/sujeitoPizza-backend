import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    // buscando no banco o usuário que tem o mesmo id que o id enviado
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      //passando apenas as propriedades que quero devolver
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    return user;
  }
}

export { DetailUserService };
