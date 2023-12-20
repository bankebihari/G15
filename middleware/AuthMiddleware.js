
import jwt  from "jsonwebtoken"
import UserModal from "../Models/UserModal.js";

export const RequireSignIn=async(req,res,next)=>{
    try {

        const decode=await jwt.verify(
            req.headers.authorization,
            process.env.SECRET
        )
        req.user=decode;
        next()

        
    } catch (error) {
        console.log(error)
        
    }

}

export const isAdmin=async(req,res,next)=>{
    try {
        const user=await UserModal.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:"please login to access this resources"
            })

        }else{
            next()
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
          success: false,
          error,
          message: "Error in admin middelware",
        });
        
    }

}