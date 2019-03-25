import { Request, Response } from 'express';
import mongoose from 'mongoose';
import AppConstants from '../constants/appConstants';
import Pet from '../models/pet';
import PetService from '../services/petService';
import BaseController from './baseController';

export class PetController extends BaseController {
    private petService: PetService;

    public constructor(petService: PetService) {
        super();
        this.petService = petService;
    }

    public getPet = async (req: Request, res: Response) => {
        try {
            const pet = await this.petService.getPet();
            return this.appResponse.success(res, {pet});
        } catch (error) {
            if (error) {
                if (error.code === AppConstants.ERROR_CODES.BAD_REQUEST) {
                    return this.appResponse.badRequest(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.NOT_FOUND) {
                    return this.appResponse.notFound(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                    return this.appResponse.error(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else {
                    throw error;
                }
            }
        }
    }

    public getPetById = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const pet = await this.petService.getPetById(id);
            return this.appResponse.success(res, {pet});
        } catch (error) {
            if (error) {
                if (error.code === AppConstants.ERROR_CODES.NOT_FOUND) {
                    return this.appResponse.notFound(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                    return this.appResponse.error(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY) {
                    return this.appResponse.unprocessableEntity(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else {
                    throw error;
                }
            }
        }
    }

    public addPet = async (req: Request, res: Response) => {
        try {
            const newPet = new Pet({
                _id : new mongoose.Types.ObjectId(),
                category: {
                    categoryId : new mongoose.Types.ObjectId(),
                    categoryName: req.body.category.categoryName,
                },
                name: req.body.name,
                photoUrl: req.body.photoUrl,
                status: req.body.status,
            });
            await this.petService.addPet(newPet);
            return this.appResponse.success(res, {newPet});
        } catch (error) {
            if (error) {
                if (error.code === AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                    return this.appResponse.error(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY) {
                    return this.appResponse.unprocessableEntity(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else {
                    throw error;
                }
            }
        }
    }

    public getPetByName = async (req: Request, res: Response) => {
        try {
            let name = req.params.petName;
            name = '^' + name;
            const pet = await this.petService.getPetByName(name);
            return this.appResponse.success(res, {pet});
        } catch (error) {
            if (error) {
                if (error.code === AppConstants.ERROR_CODES.NOT_FOUND) {
                    return this.appResponse.notFound(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                    return this.appResponse.error(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY) {
                    return this.appResponse.unprocessableEntity(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else {
                    throw error;
                }
            }
        }
    }

    public deletePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.petService.deletePet(id);
            return this.appResponse.success(res, 'pet deleted successfully');
        } catch (error) {
            if (error) {
                if (error.code === AppConstants.ERROR_CODES.NOT_FOUND) {
                    return this.appResponse.notFound(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                    return this.appResponse.error(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY) {
                    return this.appResponse.unprocessableEntity(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else {
                    throw error;
                }
            }
        }
    }

    public updatePet = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const body = req.body;
            const pet = await this.petService.updatePet(id, body);
            return this.appResponse.success(res, {pet});
        } catch (error) {
            if (error) {
                if (error.code === AppConstants.ERROR_CODES.NOT_FOUND) {
                    return this.appResponse.notFound(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR) {
                    return this.appResponse.error(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else if (error.code === AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY) {
                    return this.appResponse.unprocessableEntity(
                        res,
                        error.code,
                        res.__(error.message),
                    );
                } else {
                    throw error;
                }
            }
        }
    }
}

export default PetController;
