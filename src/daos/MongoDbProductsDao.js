import MongoDbContainer from '../containers/MongoDbContainer.js';

class MongoDbProductsDao extends MongoDbContainer {
    constructor() {
        super('products', {
            name: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            thumbnail: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
        });
    }
}

export default MongoDbProductsDao;