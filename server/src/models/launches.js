const launchesDatabase=require("./launches.schema");
const launches=new Map();
const planets=require("./planets.schema");
let DEFAULT_FLIGHT_NUMBER=100;
 
const launch={
    flightNumber:100,
    launchDate: new Date("May 27, 2030"),
    mission: "KST22",
    rocket:"MTN182",
    target:"Kepler-1652 b",
    customer:["Tesla","SpaceX"],
    upcoming:true,
    success:true
};

saveLaunch(launch);

async function getAllLaunches(){
    return launchesDatabase
    .find({},{"__v":0, "_id":0});
}

/*function addNewLaunch(launch){

    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,
        {upcoming:true,
            success:true,
            customers:["Nasa","SpaceX"],
            flightNumber:latestFlightNumber
       })
       );
       
}*/

async function saveLaunch(launch){
    const planet=await planets.findOne({keplerName:launch.target})
    if(!planet){
     throw new Error("No matching planet is found");
    }else{
        await launchesDatabase.updateOne({
            flightNumber:launch.flightNumber
        },launch,{
            upsert:true
        })
    }
   
}

async function launchExistsById(launchId){
    console.log(await launchesDatabase.findOne({
        flightNumber:launchId
    }));
return await launchesDatabase.findOne({
    flightNumber:launchId
});

};

async function abortLaunchById(launchId){
    const aborted=await launchesDatabase.updateOne({
        flightNumber:launchId
    },{
        upcoming:false,
        success:false
    });
    return aborted.matchedCount===1;


};

async function getLatestFlightNumber(){
    const latestLaunch=await launchesDatabase.findOne().sort("-flightNumber");
const latestFlightNumber=latestLaunch.flightNumber;
if(!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER

}
console.log(latestFlightNumber);
return latestFlightNumber
}

async function scheduleLaunch(launch){
   const newFlightNumber= await getLatestFlightNumber() +1;
const newLaunch= Object.assign(launch,{
        upcoming:true,
        success:true,
        customers:["Nasa","SpaceX"],
        flightNumber:newFlightNumber

    })
    await saveLaunch(newLaunch);

}

module.exports={
   getAllLaunches,
   scheduleLaunch,
   launchExistsById,
   abortLaunchById

  
}