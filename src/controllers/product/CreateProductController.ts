import { Request, Response } from "express";
import { CreateProductService } from "../../services/product";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("error upload file");
    } else {
      //renomeando ao invés de filename para banner
      const { originalname, filename: banner } = req.file;

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
