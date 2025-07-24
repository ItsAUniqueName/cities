import { Router } from "express";
import { getCity, createCity, getCityById, updateCity, deleteCity } from "../controller/cityController";

const router = Router();

router.get('/', getCity);
router.get('/:id', getCityById);
router.post('/', createCity);
router.put('/', updateCity);
router.delete('/', deleteCity);

export default router;