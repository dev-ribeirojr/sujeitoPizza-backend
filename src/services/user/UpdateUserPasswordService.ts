import { compare, hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UpdateUserRequest {
  password: string;
  new_password: string;
  user_id: string;
}

class UpdateUserPasswordService {
  async execute({ password, new_password, user_id }: UpdateUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (user) {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("user/password incorrect");
      }

      const passwordHash = await hash(new_password, 8);

      const userUpdate = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          password: passwordHash,
          updated_at: new Date(),
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          updated_at: true,
          created_at: true,
        },
      });

      return userUpdate;
    }
  }
}

export { UpdateUserPasswordService };
