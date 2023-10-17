import prismaClient from "../../prisma";

interface UpdateCategoryRequest {
  category_id: string;
  name: string;
}

class UpdateCategoryService {
  async execute({ category_id, name }: UpdateCategoryRequest) {
    const categoryAlreadyExist = await prismaClient.category.findFirst({
      where: {
        name,
      },
    });

    if (categoryAlreadyExist) {
      throw new Error("Categoria já cadastrada");
    }

    const category = await prismaClient.category.update({
      where: {
        id: category_id,
      },
      data: {
        name,
        updated_at: new Date(),
      },
    });

    return category;
  }
}

export { UpdateCategoryService };
