import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const petSchema = new Schema({
   // _id: mongoose.Schema.Types.ObjectId,
    category: {
        categoryId: mongoose.Schema.Types.ObjectId,
        categoryName: String,
    },
    name: String,
    photoUrl: String,
    status: String,
    created_date: {
        type: Date,
        default: Date.now,
    },
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;
