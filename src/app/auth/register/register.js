"use server";
import { collectionList, databaseConnect } from "@/lib/databaseConnect";
import bcrypt from "bcrypt";



export async function handleRegister(payload) {

    const oldUser= await (await databaseConnect(collectionList.usersCollection)).findOne({email:payload.email});

    if(oldUser){
        return {success:false};
    }

    const {confirmPassword, ...userData}= payload;

    const hasedPassword=await bcrypt.hash(userData.password, 10);

    userData.password=hasedPassword;

    const res= await (await databaseConnect(collectionList.usersCollection)).insertOne(userData);

    if(res.acknowledged){
        return{success:true};
    }
    else
    {
        return {success:false};
    }

    
    console.log(payload);
}