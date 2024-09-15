import {Schema, models, model, Document} from 'mongoose';

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdDate: Date;
    imageUrl: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    price: string;
    isFree: boolean;
    url: string;
    category: { _id: string, name: string}
    organizer: { _id: string ,email: string, firstName: string, lastName: string};
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String
    },
    startDateTime: {
        type: Date
    },
    endDateTime: {
        type: Date
    },
    price: {
        type: String
    },
    isFree: {
        type: Boolean,
        default: false
    },
    url: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true
});

const Event = models.Event || model('Event', EventSchema);
export default Event;

