import prismaClient from "../../prisma";

interface ItemRequest {
  item_id: string;
  amount: number;
}

class UpdateQuantityItemService {
  async execute({ item_id, amount }: ItemRequest) {
    const item = await prismaClient.item.update({
      where: {
        id: item_id,
      },
      data: {
        amount: amount,
      },
    });

    return item;
  }
}

export { UpdateQuantityItemService };
