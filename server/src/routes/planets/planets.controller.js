const {getAllPlanets}=require("../../models/planets");

<<<<<<< HEAD
async function httpGetAllPlanets(req,res){
   console.log(res);
   return res.status(200).json(await getAllPlanets());
  
=======
function httpGetAllPlanets(req,res){
   return res.status(200).json(getAllPlanets());
>>>>>>> c8638821ba21b26abbed8efe5e3663ea89acd3c5
}


module.exports={
   httpGetAllPlanets
};