import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class UpdateOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.findFirst({
      where: {
        id: order_id,
      },
    });

    let step = order?.step;

    if (step == "pending") {
      //iniciou a preparação do pedido
      step = "preparing";
    } else if (step == "preparing") {
      //finalizou a preparação do pedido agora está pronto para servir
      step = "readyToServe";
    } else if (step == "readyToServe") {
      //pedido foi servido
      step = "served";
    }

    const orderUpdate = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        step: step,
        updated_at: new Date(),
      },
    });

    return orderUpdate;
  }
}

export { UpdateOrderService };
