import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {
    const itemAlreadyExists = await prismaClient.item.findFirst({
      where: {
        order_id,
        product_id,
      },
    });
    if (itemAlreadyExists) {
      throw new Error("Produto já Adicionado deseja adicionar mesmo assim?");
    }

    const order = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        amount,
      },
    });

    return order;
  }
}

export { AddItemService };
