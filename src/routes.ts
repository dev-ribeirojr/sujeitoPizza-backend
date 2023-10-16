import { Router } from "express";
import uploadConfig from "./config/multer";
import multer from "multer";

// middleware
import {
  isAuthenticated,
  isAdm,
  orderPermission,
  orderUpdatePermission,
} from "./middlewares";

// User
import {
  AuthUserController,
  CreateUserController,
  DetailUserController,
} from "./controllers/user";

// category
import {
  CreateCategoryController,
  ListCategoryController,
} from "./controllers/category";

// product
import {
  CreateProductController,
  ListByCategoryController,
} from "./controllers/product";

// order
import {
  AddItemController,
  CreateOrderController,
  DeleteItemController,
  DeleteOrderController,
  DetailOrderController,
  ListOrdersController,
  SendOrderController,
  UpdateOrderController,
  UpdateQuantityItemController,
} from "./controllers/order";

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

router.post(
  "/order",
  isAuthenticated,
  orderPermission,
  new CreateOrderController().handle
);
router.delete(
  "/order",
  isAuthenticated,
  orderPermission,
  new DeleteOrderController().handle
);

router.post(
  "/order/add",
  isAuthenticated,
  orderPermission,
  new AddItemController().handle
);
router.delete(
  "/order/delete",
  isAuthenticated,
  orderPermission,
  new DeleteItemController().handle
);
router.put(
  "/order/send",
  isAuthenticated,
  isAdm,
  new SendOrderController().handle
);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);
router.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);

router.put(
  "/order/update",
  isAuthenticated,
  orderUpdatePermission,
  new UpdateOrderController().handle
);

router.put(
  "/item/update",
  isAuthenticated,
  orderPermission,
  new UpdateQuantityItemController().handle
);

export { router };
