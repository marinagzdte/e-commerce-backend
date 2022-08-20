import FirebaseContainer from "../containers/FirebaseContainer.js";

class FirebaseProductsDao extends FirebaseContainer {
    constructor() {
        super('products');
    }
}

export default FirebaseProductsDao;