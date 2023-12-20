import OrderModel from "../Models/OrderModel.js";
import UserModal from "../Models/UserModal.js";
import { ComparePassword, HashPassword } from "../helper/AuthHelper.js";
import jwt from "jsonwebtoken"

export  const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body;
        if (!name) {
            return res.send({ error: "Name is Required" });
          }
          if (!email) {
            return res.send({ message: "Email is Required" });
          }
          if (!password) {
            return res.send({ message: "Password is Required" });
          }
          if (!phone) {
            return res.send({ message: "Phone no is Required" });
          }
          if (!address) {
            return res.send({ message: "Address is Required" });
          }
          if (!answer) {
            return res.send({ message: "Answer is Required" });
          }

          const existinguser=await UserModal.findOne({email});
          if (existinguser) {
            return res.status(200).send({
              success: false,
              message: "Already Register please login",
            });
          }

          const hashpassword=await HashPassword(password);

          const user=await new UserModal({
            name,email,password:hashpassword,phone,address,answer

          }).save()
          
          res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
          });
          
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
        
    }


}

export const loginController=async(req,res)=>{
  try {
    const{email,password}=req.body;
  if(!email || !password){
    return res.status(404).send({message:"please enter both fileds"})
  }
  const user=await UserModal.findOne({email});
  if(!user){
    return res.status(404).send({
      message:'user not found with this email'
    })
  }
  const matchpassword=await ComparePassword(password,user.password);

  if(!matchpassword){
    return res.status(404).send({
      message:"please enter valid password"
    })
  }

  const token= await jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"7d"})
  res.status(200).send({
    success: true,
    message: "login successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role:user.role
    },
    token,
  });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
    
  }
  

}

export const ForgotPassword=async(req,res)=>{
  try {
    const {email,answer,password}=req.body;
  if(!email){
    return res.status(404).send({message:"email is required"})
  }
  if(!answer){
    return res.status(404).send({message:"answer isrequired"})
  }
  if(!password){
    return res.status(404).send({message:"newpassword is required"})
  }

  const  user=await UserModal.findOne({email,answer});
  if(!user){
    return res.status(404).send({
      success:false,
      message:"user not found please regiser"

    })
  }
  const hashedpassword=await HashPassword(password);
   await UserModal.findByIdAndUpdate(user._id,{password:hashedpassword},{new:true})
 res.status(200).send({
  success:true,
  message:"password updated succesfully"
 })

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
    
  }

}

export const testController=async(req,res)=>{
  res.status(200).send({
    message:"tested succesfully"
  })
}

export const updateProfile=async(req,res)=>{
  try {
    const {name,email,password,address,phone}=req.body;
    const user=await UserModal.findById(req.user._id);
    
    const hashedpassword=password?await HashPassword(password):undefined
    const  updateduser=await UserModal.findByIdAndUpdate(req.user._id,{
      name: name ||user.name,
      email: email ||user.email,
      password :hashedpassword || user.password,
      phone: phone ||user.phone,
      address: address ||user.address
    },{new:true})
    res.status(200).send({
      success:true,
      message:"profile updated",
      updateduser
    })

    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user profile",
      error,
    });
    
  }

}

export const getOrderController=async(req,res)=>{
  try {
    const orders=await OrderModel.find({buyer:req.user._id}).populate('products',"-photo").populate("buyer","name")
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while getting orders",
      error
    })
    
  }
}


export const getAllOrderController=async(req,res)=>{
  try {
    const orders=await OrderModel.find({}).populate('products',"-photo").populate("buyer","name").sort({createdAt:"-1"})
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while getting orders",
      error
    })
    
  }
}


export const orderStatusController=async(req,res)=>{
  try {
    const {orderId}=req.params;
    const {status}=req.body;
    const orders=await OrderModel.findByIdAndUpdate(orderId,{status},{new:true})
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while getting orders",
      error
    })
    
  
    
  }

}