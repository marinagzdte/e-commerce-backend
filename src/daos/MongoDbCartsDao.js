import MongoDbContainer from '../containers/MongoDbContainer.js';

class MongoDbCartsDao extends MongoDbContainer {
    constructor() {
        super('carts', {
            timestamp: { type: Date, required: true },
            products: { type: Array, required: true },
        });
    }

    save() {
        const newCart = { timestamp: new Date(), products: [] }
        super.save(newCart)
    }
}

export default MongoDbCartsDao;