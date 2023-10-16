import { Request, Response } from "express";
import { UpdateQuantityItemService } from "../../services/order";

class UpdateQuantityItemController {
  async handle(req: Request, res: Response) {
    const { item_id, amount } = req.body;

    console.log(item_id);
    console.log(amount);

    const updateQuantityItemService = new UpdateQuantityItemService();

    const item = await updateQuantityItemService.execute({ item_id, amount });

    return res.json(item);
  }
}

export { UpdateQuantityItemController };
