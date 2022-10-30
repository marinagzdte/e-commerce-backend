import MongoDbContainer from '../containers/MongoDbContainer.js';
import mongoose from 'mongoose';

class MongoDbUsersDao extends MongoDbContainer {
    constructor() {
        super('users', new mongoose.Schema({
            name: { type: String, required: true },
            address: { type: String, required: true },
            age: { type: Number, required: true },
            phoneNumber: { type: String, required: true },
            avatar: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true }
        }));
    }
}

export default MongoDbUsersDao;