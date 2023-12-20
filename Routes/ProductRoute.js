import express from "express"
import { CreateProductController, DeleteProductController, FiltersController, GetAllProductController, ProductCountController, ProductListController, SearchController, SingleProductController, UpdateProductController, braintreePaymentController, braintreeTokenController, photoProductController } from "../Controllers/ProductController.js";
import formidable from "express-formidable";
import { RequireSignIn } from "../middleware/AuthMiddleware.js";

const router=express.Router();

router.post("/create-product",formidable(),CreateProductController)
router.put("/update-product/:pid",formidable(),UpdateProductController)
router.get("/get-product",GetAllProductController)
router.get("/single-product/:slug",SingleProductController)
router.get("/photo-product/:pid",photoProductController)
router.delete("/delete-product/:pid",DeleteProductController)
router.post("/filter-product",FiltersController)
router.get('/count-product',ProductCountController)
router.get("/product-list/:page",ProductListController)
router.get("/search/:keyword",SearchController);
router.get('/braintree/token',braintreeTokenController)
router.post('/braintree/payment',RequireSignIn,braintreePaymentController)

export default router