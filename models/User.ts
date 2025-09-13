import mongoose, { model, Schema,models } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser {
    email:string;
    password:string;
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
}

const userSchema = new Schema<IUser>({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{timestamps:true});

// Before saving the user details , must hash the password of user or Incase,password field modifed , hash the password this is done by "pre" hook
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})
// models - An array containing all models associated with this Mongoose instance.
const User = models?.User || model<IUser>("User",userSchema);

export default User; 