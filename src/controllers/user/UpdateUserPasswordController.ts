import { Request, Response } from "express";
import { UpdateUserPasswordService } from "../../services/user";

class UpdateUserPasswordController {
  async handle(req: Request, res: Response) {
    const { password, new_password, user_id } = req.body;

    const udateUserPasswordService = new UpdateUserPasswordService();

    const user = await udateUserPasswordService.execute({
      password,
      new_password,
      user_id,
    });

    return res.json(user);
  }
}
export { UpdateUserPasswordController };
