import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let cartsDao;
let productsDao;

switch (process.env.PERSISTENCE) {
    case 'mongodb':
        console.log('configurando mongo')
        const { default: MongoDbProductsDao } = await import('./MongoDbProductsDao.js')
        const { default: MongoDbCartsDao } = await import('./MongoDbCartsDao.js');
        productsDao = new MongoDbProductsDao();
        cartsDao = new MongoDbCartsDao();
        break;
    case 'firebase':
        const { default: FirebaseProductsDao } = await import('./FirebaseProductsDao.js')
        const { default: FirebaseCartsDao } = await import('./FirebaseCartsDao.js');
        productsDao = new FirebaseProductsDao();
        cartsDao = new FirebaseCartsDao();
        break;
    default:
        console.log('no funca')
        break;
}

export { productsDao, cartsDao }