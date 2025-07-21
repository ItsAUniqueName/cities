import { Request, Response } from "express";

export const getCounty = (req: Request, res: Response) => {
    
    return res.status(400).json({message: "County and city name are required!"});
}