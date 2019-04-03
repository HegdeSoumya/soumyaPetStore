import Pet from '../models/pet';

export class PetRepository {
    public getPet = () => {
        return Pet.find({});
    }

    // public getPetById = (id: string) => {
    //     return Pet.findById(id);
    // }

    public addPet = (newPet: any) => {
        return Pet.create(newPet);
    }

    // public getPetByName = (name: string) => {
    //     return Pet.find({name: {$regex: name}});
    // }

    public getPetBySearch = (id: string, name: string) => {
        if (id && name) {
            return Pet.find({_id: id, name: {$regex: '^' + name}});
        } else {
            if (id) {
                return Pet.find({_id: id});
            }
            if (name) {
                return Pet.find({name: {$regex: name}});
            }
        }
    }

    public deletePet = (id: string) => {
        return Pet.findByIdAndDelete(id);
    }

    public updatePet = (id: string, body: any) => {
        return Pet.findByIdAndUpdate({_id: id}, {$set: body}, {new: true});
    }

}

export default PetRepository;
