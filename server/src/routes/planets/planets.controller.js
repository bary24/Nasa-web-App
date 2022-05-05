const {getAllPlanets}=require("../../models/planets");

async function httpGetAllPlanets(req,res){
   console.log(res);
   return res.status(200).json(await getAllPlanets());
  
}


module.exports={
   httpGetAllPlanets
};