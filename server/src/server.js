const http=require("http");
const app=require("./app");
const {loadPlanetsData}=require("./models/planets");

const mongoose=require("mongoose");
const MONGO_URL="mongodb+srv://bary98:Roundaround%401@nasa-project.ef5ta.mongodb.net/Nasa?retryWrites=true&w=majority" ;
const PORT=process.env.PORT||8000;

const server=http.createServer(app);
mongoose.connection.once("open",()=>{
console.log("mongodb connection is working");
});
mongoose.connection.on("error",(err)=>{
    console.log(err);
});
async function startServer(){
   await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT,function(){
        console.log(`working on port ${PORT}`);
    });
};
startServer();



