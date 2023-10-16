import { Router } from "express";
import uploadConfig from "./config/multer";
import multer from "multer";

import { AuthUserController } from "./controllers/user/AuthUserController";

//-- Create
import { CreateUserController } from "./controllers/user/CreateUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { CreateProductController } from "./controllers/product/CreateProductController";

//-- Add
import { AddItemController } from "./controllers/order/AddItemController";

//-- Detail
import { DetailUserController } from "./controllers/user/DetailUserController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";

//-- Delete
import { DeleteItemController } from "./controllers/order/DeleteItemController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";

// List
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";

//Update
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

// middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdm } from "./middlewares/isAdm";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//  -- ROTAS USER --

router.post(
  "/users",
  isAuthenticated,
  isAdm,
  new CreateUserController().handle
);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- ROTAS CATEGORY

router.post(
  "/category",
  isAuthenticated,
  isAdm,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

//-- ROTAS DE PRODUTOS
router.post(
  "/product",
  isAuthenticated,
  isAdm,
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

router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/delete",
  isAuthenticated,
  new DeleteItemController().handle
);

router.put("/order/send", isAuthenticated, new SendOrderController().handle);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);
router.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);

router.put(
  "/order/finish",
  isAuthenticated,
  new FinishOrderController().handle
);

export { router };
