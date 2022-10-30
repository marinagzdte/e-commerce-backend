import MongoDbContainer from '../../containers/MongoDbContainer.js';
import mongoose from 'mongoose';

class MongoDbUsersDao extends MongoDbContainer {
    constructor() {
        super('users', new mongoose.Schema({
            name: { type: String, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true }
        }));
    }
}

export default MongoDbUsersDao;