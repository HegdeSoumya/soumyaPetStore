"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.petSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    category: {
        // categoryId: mongoose.Schema.Types.ObjectId,
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
const Pet = mongoose.model('Pet', exports.petSchema);
exports.default = Pet;
//# sourceMappingURL=pets.js.map