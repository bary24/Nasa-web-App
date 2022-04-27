const http=require("http");
const app=require("./app");
const {loadPlanetsData}=require("./models/planets");


const PORT=process.env.PORT||8000;
const server=http.createServer(app);
async function startServer(){
    await loadPlanetsData();
    server.listen(PORT,function(){
        console.log(`working on port ${PORT}`);
    });
};
startServer();

    



