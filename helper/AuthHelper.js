import bcrypt from "bcrypt"

 export const HashPassword=async(password)=>{
    return await bcrypt.hash(password,3);
}
export const ComparePassword=async(password,hashpassword)=>{

    return await bcrypt.compare(password,hashpassword);

}