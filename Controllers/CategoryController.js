
import CategoryModel from "../Models/CategoryModel.js"
import slugify from "slugify";


export const CreateCategoryController=async(req,res)=>{
    try {
        const{name}=req.body;
        if(!name){
            return res.status(500).send({message:"category name is required"})
        }
        const existingcategory=await CategoryModel.findOne({name});
        if(existingcategory){
            return res.status(500).send({message:"category name already exist"})


        }
        const category=await new CategoryModel({ name,slug:slugify(name)}).save()
        
        res.status(201).send({
            success:true,
            category,
            message:"category created successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:` ERROR IN CREATE CATEGORY ${error}`
        })
        
    }

    

}



export const UpdateCategoryController=async(req,res)=>{
    try {
        const{name}=req.body;
       
        
       
        const category= await CategoryModel.findByIdAndUpdate(req.params.id,{name,slug:slugify(name)},{new:true})
        
       
        res.status(200).send({
            success:true,
            category,
            message:"category Updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:` ERROR IN updating CATEGORY ${error}`
        })
        
    }
        
}

export const GetAllCategory=async(req,res)=>{

    try {
        const category=await CategoryModel.find({});
        res.status(200).send({
            success:true,
            category,
            message:"Got all Category successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:` ERROR IN Getting all CATEGORY ${error}`
        })
        
    }

}

export const SingleCategoryController=async(req,res)=>{
    try {

        const category=await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            category,
            message:"Got single Category successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:` ERROR IN geeting single CATEGORY ${error}`
        })
        
    }

}

export const DeleteCategoryController=async(req,res)=>{
    try {
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success:true,
           
            message:"deleted Category successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:` ERROR delete CATEGORY ${error}`
        })
        
    }

}