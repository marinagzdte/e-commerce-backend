import FirebaseContainer from "../containers/FirebaseContainer.js";

class FirebaseCartsDao extends FirebaseContainer {
    constructor() {
        super('carts');
    }

    save() {
        const newCart = { timestamp: new Date(), products: [] }
        return super.save(newCart)
    }
}

export default FirebaseCartsDao;