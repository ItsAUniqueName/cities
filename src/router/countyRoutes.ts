import { Router } from "express";
import { getCounty, getCountyById } from "../controller/countyController";

const router = Router();

router.get('/', getCounty);
router.get('/:id', getCountyById);

export default router;