import { Request, Response } from "express";
import { logger } from "../logger";
import { prisma } from "../prisma";

//return all counties
export const getCounty = async (req: Request, res: Response) => {
    try {
        const counties = await prisma.county.findMany();
        logger.info('Selected counties: ', counties);
        res.status(200).json(counties);
    } catch (error) {
        logger.error('Error fetching counties:', error);
        res.status(500).send('Internal Server Error');
    }
}

//return county by id
export const getCountyById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    if(id){
        try {
            const county = await prisma.county.findUnique({
                where: {
                id: id,
                },
            });
            logger.info('Selected county: ', county);
            res.status(200).json(county);
        } catch (error) {
            logger.error('Error fetching counties:', error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Id is required!');
    }
}