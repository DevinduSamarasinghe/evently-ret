import {Schema, model, models, Document} from 'mongoose';

export interface IUser extends Document {
    _id: string,
    clerkId: string, 
    email: string, 
    username: string,
    firstName: string, 
    lastName: string,
    createdAt?: Date,
    updatedAt?:Date
}

const UserSchema = new Schema({
    clerkId: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    username: {
        type: String, 
        required: true,
        unique: true
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    photo: {
        type: String,
        required: false
    }
},{
    timestamps: true
}); 

//We refer to the existing model if it exists, because of serverless invocations 
const User = models.User || model('User', UserSchema);
export default User;