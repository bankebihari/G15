import express from "express"
import {  ForgotPassword, getAllOrderController, getOrderController, loginController, orderStatusController, registerController, testController, updateProfile } from "../Controllers/AuthController.js";
import { RequireSignIn, isAdmin } from "../middleware/AuthMiddleware.js";

const router=express.Router();

router.post("/register",registerController)
router.post("/login",loginController);
router.get("/test",RequireSignIn,testController)
router.post("/forgot-password",ForgotPassword)
router.get("/user-auth",RequireSignIn,(req,res)=>{
    res.status(200).send({ok:true});

})
router.get("/admin-auth",RequireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});

})
router.put("/update-profile",RequireSignIn,updateProfile)
router.get("/orders",RequireSignIn,getOrderController)
router.get("/all-orders",RequireSignIn,isAdmin,getAllOrderController)
router.put("/order-status/:orderId",RequireSignIn,isAdmin,orderStatusController)
   
    


export default router