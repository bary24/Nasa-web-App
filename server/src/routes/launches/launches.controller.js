const {getAllLaunches,scheduleLaunch,launchExistsById,abortLaunchById}=require("../../models/launches");

async function httpGetAllLaunches(req,res){
   return res.status(200).json(await getAllLaunches());

};

async function httpAddNewLaunch(req,res){
    const launch=req.body;
    if(!launch.mission||!launch.launchDate||
    !launch.rocket||!launch.target){
return res.status(400).json({
    error:"Missing launch property!"
});
    }

    launch.launchDate=new Date(launch.launchDate);
    
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"invalid date format"
        });
    }
    
   await scheduleLaunch(launch);
    return res.status(201).json(launch);

}

async function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);
    const launchExists=await launchExistsById(launchId);
    if(!launchExists){
        return res.status(404).json({
            error:"launch not found"
        });
    }

const aborted=await abortLaunchById(launchId);
if(aborted){
res.status(200).json("Abortion successful");
}else{
    res.status(400).json("Abortion failed");
}
}
module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
    
};