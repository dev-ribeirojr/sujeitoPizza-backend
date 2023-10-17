import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id, product_id } = req.body;

    const updateProductService = new UpdateProductService();

    //renomeando ao invés de filename para banner

    const product = await updateProductService.execute({
      name,
      price,
      description,
      category_id,
      product_id,
    });

    return res.json(product);
  }
}
export { UpdateProductController };
