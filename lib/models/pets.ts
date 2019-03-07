import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const petSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {
        categoryId: mongoose.Schema.Types.ObjectId,
        categoryName: String,
    },
    name: String,
    photoUrl: String,
    status: String,
    // tslint:disable-next-line:object-literal-sort-keys
    created_date: {
        type: Date,
        // tslint:disable-next-line:object-literal-sort-keys
        default: Date.now,
    },
});
