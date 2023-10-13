import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    if (
      name === "" ||
      price === "" ||
      description === "" ||
      category_id === ""
    ) {
      throw new Error("Product invalid");
    }
    //cadastrando produto no banco
    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id,
      },
    });

    return product;
  }
}

export { CreateProductService };
