import { Router } from "express";
import { getCounty } from "../controller/countyController";

const router = Router();

router.get('/', getCounty);

export default router;