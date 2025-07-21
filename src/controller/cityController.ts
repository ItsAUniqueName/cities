import { Request, Response } from "express";

export const createCity = (req: Request, res: Response) => {
    const {county, name} = req.body;

    if(!county || !name){
        return res.status(400).json({message: "County and city name are required!"});
    }
}

export const getCity = (req: Request, res: Response) => {
    const {id, name} = req.body;

    if(id){

    }else if(name){

    }

    return res.status(400).json({message: "County and city name are required!"});
}