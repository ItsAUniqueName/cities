import { Request, Response } from "express";
import { logger } from "../logger";
import { prisma } from "../prisma";

export const getCounty = async (req: Request, res: Response) => {
    try {
        logger.info('GET /county/');
        const cities = await prisma.county.findMany();
        res.status(200).json(cities);
    } catch (error) {
        logger.error('Error fetching counties:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const getCountyById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    if(id){
        try {
            logger.info('GET /county/');
            await prisma.county.findUnique({
                where: {
                id: id,
                },
            });
            res.status(200);
        } catch (error) {
            logger.error('Error fetching counties:', error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Id is required!');
    }
}