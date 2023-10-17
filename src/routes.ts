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
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//  -- ROTAS USER --

// post
router.post(
  "/users",
  isAuthenticated,
  isAdm,
  new CreateUserController().handle
);

router.post("/session", new AuthUserController().handle);

// get
router.get("/me", isAuthenticated, new DetailUserController().handle);

//  -- ROTAS CATEGORY --

// post
router.post(
  "/category",
  isAuthenticated,
  isAdm,
  new CreateCategoryController().handle
);
// get
router.get("/category", isAuthenticated, new ListCategoryController().handle);

//put

router.put(
  "/category",
  isAuthenticated,
  isAdm,
  new UpdateCategoryController().handle
);

//  -- ROTAS DE PRODUTOS --

// post
router.post(
  "/product",
  isAuthenticated,
  isAdm,
  upload.single("file"),
  new CreateProductController().handle
);

// get
router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

//  -- ROTAS ORDER --
//post
router.post(
  "/order",
  isAuthenticated,
  orderPermission,
  new CreateOrderController().handle
);
router.post(
  "/order/add",
  isAuthenticated,
  orderPermission,
  new AddItemController().handle
);

// put
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
router.put(
  "/order/send",
  isAuthenticated,
  isAdm,
  new SendOrderController().handle
);

//delte
router.delete(
  "/order",
  isAuthenticated,
  orderPermission,
  new DeleteOrderController().handle
);

router.delete(
  "/order/delete",
  isAuthenticated,
  orderPermission,
  new DeleteItemController().handle
);

// get
router.get("/orders", isAuthenticated, new ListOrdersController().handle);
router.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);

export { router };
