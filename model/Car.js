import { Schema, model } from 'mongoose';
const CarSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    images: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
export default model('Car', CarSchema);
