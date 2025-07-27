import { Router } from "express";
import { getCity, createCity, getCityById, updateCity, deleteCity, getCityByCountyId } from "../controller/cityController";

//contains all routes which work with cities
const router = Router();

router.get('/', getCity);
router.get('/:id', getCityById);
router.get('/county/:id', getCityByCountyId);
router.post('/', createCity);
router.put('/', updateCity);
router.delete('/:id', deleteCity);

export default router;