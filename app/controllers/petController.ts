import appConstants from '../constants/appConstants';

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ServiceError from '../errors/ServiceError';
import Pet from '../models/pet';
import PetService from '../services/petService';
import BaseController from './baseController';

// import appConstants from '../constants/appConstants';

export class PetController extends BaseController {
    private petService: PetService;

    public constructor(petService: PetService) {
        super();
        this.petService = petService;
    }

    public getPet = async (req: Request, res: Response) => {
        try {
            const pet = await this.petService.getPet();
            return this.appResponse.success(res, { pet });
        } catch (error) {
            if (error instanceof ServiceError) {
                // console.log(appConstants.ERROR_CODES.NOT_FOUND);
                return this.appResponse.notFound(
                    res,
                    appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                    'Description',
                );
            } else {
                throw error;
            }
        }
    }

    // public getPetById = async (req: Request, res: Response) => {
    //     try {
    //         const id = req.params.petId;
    //         const pet = await this.petService.getPetById(id);
    //         if (!pet) {
    //             throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
    //                 appConstants.ERROR_MESSAGES.NOT_FOUND,
    //             );
    //         }
    //         return this.appResponse.success(res, { pet });
    //     } catch (error) {
    //         if (error instanceof ServiceError) {
    //             return this.appResponse.notFound(
    //                 res,
    //                 appConstants.ERROR_CODES.BAD_REQUEST,
    //                 appConstants.ERROR_MESSAGES.BAD_REQUEST,
    //                 'Description',
    //             );
    //         } else {
    //             throw error;
    //         }
    //     }
    // }

    public addPet = async (req: Request, res: Response) => {
        try {
            const newPet = new Pet({
                _id: new mongoose.Types.ObjectId(),
                category: {
                    categoryId: new mongoose.Types.ObjectId(),
                    categoryName: req.body.category.categoryName,
                },
                name: req.body.name,
                photoUrl: req.body.photoUrl,
                status: req.body.status,
            });
            const response = await this.petService.addPet(newPet);
            return await this.appResponse.success(res, { response });
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.error(
                    res,
                    appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                    appConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
                    'Description',
                );
            } else {
                throw error;
            }
        }
    }

    // public getPetByName = async (req: Request, res: Response) => {
    //     try {
    //         let name = req.params.name;
    //         name = '^' + name;
    //         const pet = await this.petService.getPetByName(name);
    //         return this.appResponse.success(res, { pet });
    //     } catch (error) {
    //         if (error) {
    //             if (error.code === appConstants.ERROR_CODES.NOT_FOUND) {
    //                 return this.appResponse.notFound(
    //                     res,
    //                     error.code,
    //                     res.__(error.message),
    //                     res.__(error.description),
    //                 );
    //             } else if (error.code === appConstants.ERROR_CODES.UNPROCESSABLE_ENTITY) {
    //                 return this.appResponse.unprocessableEntity(
    //                     res,
    //                     error.code,
    //                     res.__(error.message),
    //                     res.__(error.description),
    //                 );
    //             } else {
    //                 throw error;
    //             }
    //         }
    //     }
    // }

    public getPetBySearch = async (req: Request, res: Response) => {
        try {
            const id = req.query.petId;
            const name = req.query.name;
            const pet = await this.petService.getPetBySearch(id, name);
            // if (!pet) {
            //     throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
            //         appConstants.ERROR_MESSAGES.NOT_FOUND,
            //     );
            // }
            return this.appResponse.success(res, { pet });
        } catch (error) {
            // console.log(error);
            if (error instanceof ServiceError) {
                // console.log('1');
                // if (error.code === appConstants.ERROR_CODES.NOT_FOUND) {
                return this.appResponse.notFound(
                    res,
                    appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                    'Description',
                );
                // } else if (error.code === appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                //     return this.appResponse.error(
                //         res,
                //         appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                //         appConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
                //         'Description',
                //     );
            } else if (!mongoose.Types.ObjectId.isValid(req.query.petId)) {
                // console.log('2');
                return this.appResponse.badRequest(
                    res,
                    appConstants.ERROR_CODES.BAD_REQUEST,
                    appConstants.ERROR_MESSAGES.BAD_REQUEST,
                    'Description',
                );
            } else {
                throw error;
            }
        }
}

    public deletePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            await this.petService.deletePet(id);
            // if (!pet) {
            //     throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
            //         appConstants.ERROR_MESSAGES.NOT_FOUND,
            //     );
            // }
            return await this.appResponse.success(res, 'Data deleted successfully');
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.notFound(
                    res,
                    appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                    'Description',
                );
            } else {
                throw error;
            }
        }
    }

    public updatePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const body = req.body;
            const pet = await this.petService.updatePet(id, body);
            // const key = Object.keys(body);
            // console.log(typeof body);
            // if (body.constructor === Object && Object.keys(body).length === 0) {
            //     console.log('Object missing');
            //   }
            // if (Object.keys(body).length === 0) {
            //     if ('' in body) {
            //         throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
            //             appConstants.ERROR_MESSAGES.NOT_FOUND,
            //         );
            //     }
            //     throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
            //         appConstants.ERROR_MESSAGES.NOT_FOUND,
            //     );
            // }
            if (!pet) {
                throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND);
            }
            return this.appResponse.success(res, { pet });
        } catch (error) {
            if (error instanceof ServiceError) {
                return this.appResponse.notFound(
                    res,
                    appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                    'Description',
                );
            } else {
                throw error;
            }
        }
    }
}

export default PetController;
