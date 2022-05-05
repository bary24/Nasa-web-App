const fs=require("fs");
const path=require("path");
const {parse}=require("csv-parse");
const planetsModel=require("./planets.schema");
function isHabitablePlanet(planet){
    return planet['koi_disposition']==="CONFIRMED" &&
    planet["koi_insol"]>0.36 && planet["koi_insol"]<1.11
    && planet["koi_prad"]<1.6;
}
function loadPlanetsData(){
return new Promise((resolve,reject)=>{

    fs.createReadStream(path.join(__dirname,"..","..","data","kepler_data.csv"))
    .pipe(parse({
        comment:"#",
        columns:true
    }))
.on("data",async (data)=>{
    if(isHabitablePlanet(data)){
       await savePlanet(data);


}})
.on("error",(err)=>{
    console.log(err);
    reject();
})
.on("end",async ()=>{
   const planetsCount=(await getAllPlanets()).length;
    console.log(`${planetsCount} planets are found`);
    resolve();
});
});
}

 async function  getAllPlanets(){
    const planets =await planetsModel.find({
    });
    return planets;
}
async function savePlanet(planet){

    try{
        await planetsModel.updateOne({
            keplerName:planet.kepler_name
        },{
            keplerName:planet.kepler_name
        },{
            upsert:true
        });
    }catch(err){
        console.log(err);
    }
 
}

module.exports={
  getAllPlanets,
  loadPlanetsData
};