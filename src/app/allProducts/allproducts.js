"use server";
import { collectionList, databaseConnect } from "@/lib/databaseConnect";
import { ObjectId } from "mongodb";


export async function allProducts() {
    

    const res = await (await databaseConnect(collectionList.productsCollection)).find({}).toArray();

      const data = res.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

    return data;
}

export async function homeProducts() {
    

    const res = await (await databaseConnect(collectionList.productsCollection)).find({}).limit(6).sort({price:-1}).toArray();

      const data = res.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

    return data;
}


export async function getOneProduct(id) {
  const collection = await databaseConnect(collectionList.productsCollection);

  const product = await collection.findOne({ _id: new ObjectId(id) });

  if (!product) return null;

  return {
    ...product,
    _id: product._id.toString(),
  };
}