import prismaClient from "../../prisma";

interface UpdateProductRequest {
  product_id: string;
  name: string;
  price: string;
  description: string;
  category_id: string;
  banner?: string;
}

class UpdateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    product_id,
    banner,
  }: UpdateProductRequest) {
    if (
      name === "" ||
      price === "" ||
      description === "" ||
      product_id === "" ||
      category_id === ""
    ) {
      throw new Error("Preencha os campos!");
    }

    const productAlreadyExist = await prismaClient.product.findFirst({
      where: {
        name,
        // encontrado um produto com o msm nome mas com o id diferente
        NOT: {
          id: product_id,
        },
      },
    });

    if (productAlreadyExist) {
      throw new Error("Produto já cadastrado");
    }

    if (!banner) {
      const product = prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          name,
          category_id,
          price,
          description,
          updated_at: new Date(),
        },
      });

      return product;
    } else {
      const product = prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          name,
          category_id,
          price,
          description,
          banner,
          updated_at: new Date(),
        },
      });

      return product;
    }
  }
}

export { UpdateProductService };
