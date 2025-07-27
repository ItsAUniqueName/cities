import { Router } from "express";
import { getCounty, getCountyById } from "../controller/countyController";

//contains all routes working with counties
const router = Router();

router.get('/', getCounty);
router.get('/:id', getCountyById);

export default router;