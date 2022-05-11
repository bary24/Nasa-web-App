const mongoose=require("mongoose");
const path=require("path");
require("dotenv").config({path:path.join(__dirname,".env")});
const MONGO_URL=`mongodb+srv://${process.env.NAME}:${process.env.KEY}@nasa-project.ef5ta.mongodb.net/Nasa?retryWrites=true&w=majority` ;


async function connectMongo(){
    mongoose.connection.once("open",()=>{
        console.log("mongodb connection is working");
        });
        mongoose.connection.on("error",(err)=>{
            console.log(err);
        });
        await mongoose.connect(MONGO_URL);

}

module.exports={
    connectMongo
}