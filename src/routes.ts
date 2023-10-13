import { Router } from "express";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

// middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateProductController } from "./controllers/product/CreateProductController";

import uploadConfig from "./config/multer";
import multer from "multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//  -- ROTAS USER --

router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- ROTAS CATEGORY

router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

//-- ROTAS DE PRODUTOS
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

//-- ROTAS ORDER

router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new DeleteOrderController().handle);

export { router };
