import { Request, Response } from "express";
import { logger } from "../logger";
import { prisma } from "../prisma";

//returns all city from db
export const getCity = async (req: Request, res: Response) => {
    try {
        const cities = await prisma.city.findMany();
        logger.info('Selected cities: ', cities);
        res.status(200).json(cities);
    } catch (error) {
        logger.error('Error fetching cities:', error);
        res.status(500).send('Internal Server Error');
    }
}

//returns city with the given id
export const getCityById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    if(id){
        try {
            const cities = await prisma.city.findUnique({
                where: {
                id: id,
                },
            });
            logger.info('Selected city: ', cities);
            res.status(200).json(cities);
        } catch (error) {
            logger.error('Error fetching cities:', error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Id is required!');
    }
}

//returns cities to county
export const getCityByCountyId = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    if(id){
        try {
            const cities = await prisma.city.findMany({
                where: {
                countyId: id,
                },
            });
            logger.info('Selected cities: ', cities);
            res.status(200).json(cities);
        } catch (error) {
            logger.error('Error fetching cities:', error);
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Id is required!');
    }
}

//creates city then returns the new city
export const createCity = async (req: Request, res: Response) => {
    const {countyId, name} = req.body;

    if(!countyId || !name){
        return res.status(400).json({message: "County and city name are required!"});
    }else{
        try {
            const city = await prisma.city.create({
                data:{
                    countyId: parseInt(countyId),
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

//updates existing city, returns the new data
export const updateCity = async (req: Request, res: Response) => {
    const {id, name} = req.body;

    if(!id || !name){
        return res.status(400).json({message: "County and city name are required!"});
    }else{
        try {
            const city = await prisma.city.update({
                where: { id: parseInt(id) },
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

//deletes city, returns the deleted data
export const deleteCity = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    if(!id){
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