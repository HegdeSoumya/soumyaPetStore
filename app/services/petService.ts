import mongoose from 'mongoose';
import appConstants from '../constants/appConstants';
import ServiceError from '../errors/ServiceError';
import PetRepository from '../repositories/petRepository';

export class PetService {
    private petRepository: PetRepository;

    public constructor(petRepository: PetRepository) {
        this.petRepository = petRepository;
    }
    public getPet = async () => {
        try {
            return await this.petRepository.getPet();
        } catch (error) {
            throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                appConstants.ERROR_MESSAGES.NOT_FOUND,
            );
        }
    }
    // public getPetById = async (id: string) => {
    //     try {
    //         return await this.petRepository.getPetById(id);
    //     } catch (error) {
    //         throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
    //             appConstants.ERROR_MESSAGES.NOT_FOUND,
    //         );
    //     }
    // }
    public addPet = async (newPet: any) => {
        try {
            await this.petRepository.addPet(newPet);
        } catch (error) {
            throw new ServiceError(appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                appConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
            );
        }
    }
    // public getPetByName = async (name: string) => {
    //     try {
    //         const pet = await this.petRepository.getPetByName(name);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public getPetBySearch = async (id: string, name: string) => {
        try {
            const petData = await this.petRepository.getPetBySearch(id, name);
            if (petData !== null) {
                return petData;
            } else {
                throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                );
            }
        } catch (error) {
            if (!id) {
                throw new ServiceError(appConstants.ERROR_CODES.BAD_REQUEST,
                    appConstants.ERROR_MESSAGES.BAD_REQUEST,
                );
            } else {
                throw new ServiceError(appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                    appConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    public deletePet = async (id: string) => {
        try {
            const value = (await this.petRepository.deletePet(id));
            if (value === null) {
                throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                );
            }
            return value;
        } catch (error) {
            if (!id) {
                throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                );
            } else {
                throw new ServiceError(appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                    appConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    public updatePet = async (id: string, body: any) => {
        try {
            const value = await this.petRepository.updatePet(id, body);
            if (value === null || value === '') {
                throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                );
            }
            return value;
        } catch (error) {
                throw new ServiceError(appConstants.ERROR_CODES.NOT_FOUND,
                    appConstants.ERROR_MESSAGES.NOT_FOUND,
                );
            }
        }
    }

export default PetService;
