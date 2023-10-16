import { Request, Response } from "express";
import { UpdateOrderService } from "../../services/order";

class UpdateOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const updateOrderServide = new UpdateOrderService();

    const order = await updateOrderServide.execute({ order_id });

    return res.json(order);
  }
}

export { UpdateOrderController };
