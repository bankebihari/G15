import express from "express"
import { RequireSignIn, isAdmin } from "../middleware/AuthMiddleware.js";
import { CreateCategoryController, DeleteCategoryController, GetAllCategory, SingleCategoryController, UpdateCategoryController } from "../Controllers/CategoryController.js";


const router =express.Router();

router.post("/create-category",RequireSignIn,isAdmin,CreateCategoryController)

router.put("/update-category/:id",RequireSignIn,isAdmin,UpdateCategoryController)


router.get("/get-category",GetAllCategory)
router.get("/single-category/:slug",SingleCategoryController)
router.delete("/delete-category/:id",RequireSignIn,isAdmin,DeleteCategoryController)



export default router
