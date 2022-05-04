import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

<<<<<<< HEAD
async function usePlanets() {
=======
function usePlanets() {
>>>>>>> c8638821ba21b26abbed8efe5e3663ea89acd3c5
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets();
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
