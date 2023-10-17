import { Request, Response } from "express";
import { UpdateDataUserService } from "../../services/user";

class UpdateDataUserController {
  async handle(req: Request, res: Response) {
    const { user_id, name, email, status, role } = req.body;

    const updateDataUserService = new UpdateDataUserService();

    const user = await updateDataUserService.execute({
      email,
      name,
      role,
      status,
      user_id,
    });

    return res.json(user);
  }
}
export { UpdateDataUserController };
