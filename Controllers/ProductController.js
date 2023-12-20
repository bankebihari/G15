import fs from "fs"
import ProductModels from "../Models/ProductModels.js";
import slugify from "slugify";
import braintree from "braintree";
import OrderModel from "../Models/OrderModel.js";
import dotenv from "dotenv"
dotenv.config();


var gateway= new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:process.env.BRAINTREE_MERCHANT_ID,
  publicKey:process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:process.env.BRAINTREE_PRIVATE_KEY

})


export  const CreateProductController=async(req,res)=>{
    try {
        const{name,description,price,category,quantity}=req.fields;
        const {photo}=req.files;
        if(!name){
            return res.status(500).send({message:'name is required'})
        }
        if(!description){
            return res.status(500).send({message:'description is required'})
        }
        if(!price){
            return res.status(500).send({message:'price is required'})
        }
        if(!quantity){
            return res.status(500).send({message:'quantity is required'})
        }
        if(!category){
            return res.status(500).send({message:'category is required'})
        } 
        if(!photo){
            return res.status(500).send({message:'photo is required'})
        } 

        const product= await  new ProductModels({...req.fields,slug:slugify(name)})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type;
        }
       await  product.save()
       res.status(201).send({
        success:true,
        product,
        message:"product created succesfully"
       })
         
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create PRODUCT controller"
        })
        
    }

}



export  const UpdateProductController=async(req,res)=>{
    try {
        const{name,description,price,category,quantity}=req.fields;
        const {photo}=req.files;
        if(!name){
            return res.status(500).send({message:'name is required'})
        }
        if(!description){
            return res.status(500).send({message:'description is required'})
        }
        if(!price){
            return res.status(500).send({message:'price is required'})
        }
        if(!quantity){
            return res.status(500).send({message:'quantity is required'})
        }
        if(!category){
            return res.status(500).send({message:'category is required'})
        } 
        if(!photo){
            return res.status(500).send({message:'photo is required'})
        } 

       const product=await ProductModels.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type;
        }
       await  product.save()
       res.status(201).send({
        success:true,
        product,
        message:"product created succesfully"
       })
         
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create PRODUCT controller"
        })
        
    }

}


export  const GetAllProductController=async(req,res)=>{
    try {
        const product=await ProductModels.find({}).select("-photo").populate('category').sort({createdAt:-1});
        
        
        res.status(200).send({
            success:true,
            product,
            message:" Got all products succesfully"
           })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting all PRODUCT controller"
        })
        
    }

}

export  const SingleProductController=async(req,res)=>{
    try {
        const product=await ProductModels.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
           product,
            message:" Got single products succesfully"
           })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting single PRODUCT controller"
        })
        
    }

}

export const photoProductController=async(req,res)=>{

    try {
        const product=await ProductModels.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('content-type',product.photo.contentType);
            return res.status(200).send(product.photo.data)


        }

        res.status(200).send({
            success:true,
            photo,
            message:"succesfully got photo"

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting photo PRODUCT controller"
        })
        
    }

}
export  const DeleteProductController=async(req,res)=>{
    try {
        const product=await ProductModels.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
           
            message:"  products  deleted succesfully"
           })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting PRODUCT controller"
        })
        
    }

}
 export const FiltersController=async(req,res)=>{
    try {
     const {checked,radio}=req.body;
    let  args={};
    if(checked.length > 0) args.category=checked ;
    if(radio.length)  args.price={$gte:radio[0],$lte:radio[1]}
    const product=await ProductModels.find(args)
    res.status(200).send({
        success:true,
        product,
        message:"filtered successfully"
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in  filtering products controller"
        })
        
    }
    



}

export  const ProductCountController=async(req,res)=>{
    try {
        const count=await ProductModels.find().estimatedDocumentCount();
        res.status(200).send({
            success:true,
            count,
            message:" count successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in   products count controller"
        })
        
    }

} 
 

export const ProductListController=async(req,res)=>{
    try {
        const perpage=2;
    const page =req.params.page?req.params.page:1;
    const product=await ProductModels.find({}).select("-photo").skip((page-1)*perpage).limit(perpage).sort({createdAt:-1})

    res.status(200).send({
        success:true,
        product,
        message:"pagination done"

    })
     }
        
     catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in   products pagiantion controller"
        })
        
    }

    

} 

export const SearchController=async(req,res)=>{
    try {
        const {keyword}=req.params;
        const result=await ProductModels.find({
            $or:[
              {name:{$regex:keyword,$options:"i"}},
              {description:{$regex:keyword,$options:"i"}}
            ]
        }).select("-photo")
        res.json(result)

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in   search controller"
        })
        
    }
}


export const braintreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err);
            }else{
                res.send(response);
            }
        })
        
    } catch (error) {
        console.log(error);
        
    }

}

export const braintreePaymentController=async(req,res)=>{
    const {cart,nonce}=req.body;

    let total=0;
    cart.map((p)=>{
        total+=p.price
    });
    let newtransaction=gateway.transaction.sale({
        amount:total,
        paymentMethodNonce:nonce,
        options:{
            submitForSettlement:true
        }
        
    },
    function(error,result){
        if(result){
            const order=new OrderModel({
                products:cart,
                payment:result,
                buyer:req.user._id
            }).save()
            res.json({ok:true})
            

        }else{
            res.status(500).json(error);
        }
       
    }
    
    
    )

}