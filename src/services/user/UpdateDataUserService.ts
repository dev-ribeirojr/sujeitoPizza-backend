import prismaClient from "../../prisma";

interface UpdateUserRequest {
  user_id: string;
  name: string;
  role: "administrator" | "chef" | "waiter";
  email: string;
  status: boolean;
}

class UpdateDataUserService {
  async execute({ user_id, name, role, email, status }: UpdateUserRequest) {
    if (name === "" || email === "") {
      throw new Error("Preencha os campos!");
    }

    const user = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        role,
        email,
        status,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}

export { UpdateDataUserService };
