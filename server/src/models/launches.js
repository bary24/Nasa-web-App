const launches=new Map();
let latestFlightNumber=100;
 
const launch={
    flightNumber:100,
    launchDate: new Date("May 27, 2030"),
    mission: "KST22",
    rocket:"MTN182",
    target:"K-234",
    customer:["Tesla","SpaceX"],
    upcoming:true,
    success:true
};


launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){

    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,
        {upcoming:true,
            success:true,
            customers:["Nasa","SpaceX"],
            flightNumber:latestFlightNumber
       })
       );
       
}

function launchExistsById(launchId){
return launches.has(launchId);
};

function abortLaunchById(launchId){
    const aborted=launches.get(launchId);
    aborted.success=false;
    aborted.upcoming=false;
    return aborted;


};



module.exports={
   getAllLaunches,
   addNewLaunch,
   launchExistsById,
   abortLaunchById

  
}