import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category";

class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    const { category_id, name } = req.body;

    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute({ category_id, name });

    return res.json(category);
  }
}

export { UpdateCategoryController };
