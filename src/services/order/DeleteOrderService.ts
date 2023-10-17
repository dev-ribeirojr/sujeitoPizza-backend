import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class DeleteOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: "disabled",
        updated_at: new Date(),
      },
    });

    return order;
  }
}

export { DeleteOrderService };
