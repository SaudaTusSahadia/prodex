"use server";
import { collectionList, databaseConnect } from "@/lib/databaseConnect";


export async function addProduct(payload) {
    
    const res = await(await databaseConnect(collectionList.productsCollection)).insertOne(payload);
    console.log(res);

    if( res.acknowledged){
        return {success:true};
    }
    else{
        return {success:false};
    }
}