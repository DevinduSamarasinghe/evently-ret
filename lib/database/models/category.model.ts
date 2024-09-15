import {Schema, models, model, Document} from 'mongoose';

export interface ICategory extends Document {
    _id: string,
    name: string,
    createdAt?: Date,
    updatedAt?:Date
}

const CategorySchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    }
},{
    timestamps: true
});

const Category = models.Category || model('Category', CategorySchema);
export default Category;

