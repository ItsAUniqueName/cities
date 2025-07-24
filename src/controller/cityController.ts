import { Request, Response } from "express";
import { logger } from "../logger";
import { prisma } from "../prisma";

export const getCity = async (req: Request, res: Response) => {
    logger.info('GET /city/');
    try {
        const cities = await prisma.city.findMany();
        res.status(200).json(cities);
    } catch (error) {
        logger.error('Error fetching cities:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const getCityById = async (req: Request, res: Response) => {
    logger.info('GET /city/:id');
    const id: number = parseInt(req.params.id);
    if(id){
        try {
            const cities = await prisma.city.findUnique({
                where: {
                id: id,
                },
            });
            res.status(200).json(cities);
        } catch (error) {
            logger.error('Error fetching cities:', error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Id is required!');
    }
}

export const createCity = async (req: Request, res: Response) => {
    logger.info('POST /city/');
    const {county, name} = req.body;

    if(!county || !name){
        return res.status(400).json({message: "County and city name are required!"});
    }else{
        try {
            const city = await prisma.city.create({
                data:{
                    countyId: county,
                    name: name
                },
            });
            logger.info('Created city: ', city);
            res.status(200).json(city);
        } catch (error) {
            logger.error('Error fetching cities:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export const updateCity = async (req: Request, res: Response) => {
    logger.info('PUT /city/');
    const {id, name} = req.body;

    if(!id || !name){
        return res.status(400).json({message: "County and city name are required!"});
    }else{
        try {
            const city = await prisma.city.update({
                where: { id: id },
                data:{ name: name },
            });
            logger.info('City updated: ', city);
            res.status(200).json(city);
        } catch (error) {
            logger.error('Error fetching cities:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export const deleteCity = async (req: Request, res: Response) => {
    logger.info('Delete /city/');
    const {id, name} = req.body;

    if(!id || !name){
        return res.status(400).json({message: "County and city name are required!"});
    }else{
        try {
            const city = await prisma.city.delete({
                where: { id: id }
            });
            logger.info('City deleted: ', city);
            res.status(200).json(city);
        } catch (error) {
            logger.error('Error fetching cities:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}