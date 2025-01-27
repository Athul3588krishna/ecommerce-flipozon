import mongoose from "mongoose";

const connectDB = async () => {

mongoose.connection.on("connected", () => {
    console.log("Data Base is connected successfully"); 
})

await mongoose.connect(`${process.env.MONGO_URI}/flipozon`)
}

export default connectDB;
