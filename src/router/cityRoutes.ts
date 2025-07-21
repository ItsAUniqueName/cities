import { Router } from "express";
import { getCity, createCity } from "../controller/CityController";

const router = Router();

router.get('/', getCity);
router.post('/', createCity);

export default router;