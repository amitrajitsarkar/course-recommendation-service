import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

const connectDb = async() =>{
    try{
        if (!URI) throw new Error("The Mongo Uri doesn't exist");
        await mongoose.connect(URI)
        console.log("MongoDB is connected..");
    }catch(error){
        console.log("found error while connecting with the DB",error);
    }

}

export default connectDb;