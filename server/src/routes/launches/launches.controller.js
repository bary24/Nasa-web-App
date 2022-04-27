const {getAllLaunches,addNewLaunch,launchExistsById,abortLaunchById}=require("../../models/launches");

function httpGetAllLaunches(req,res){
   return res.status(200).json(getAllLaunches());

};

function httpAddNewLaunch(req,res){
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
    
    addNewLaunch(launch);
    return res.status(201).json(launch);

}

function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);
    if(!launchExistsById(launchId)){
        return res.status(404).json({
            error:"launch not found"
        });
    }

const aborted=abortLaunchById(launchId);
res.status(200).json(aborted);
}
module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
    
};