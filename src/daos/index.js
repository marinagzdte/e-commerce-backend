import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let cartsDao;
let productsDao;
let usersDao;

switch (process.env.PERSISTENCE) {
    case 'mongodb':
        // const { default: MongoDbProductsDao } = await import('./MongoDbProductsDao.js')
        // const { default: MongoDbCartsDao } = await import('./MongoDbCartsDao.js');
        // const { default: MongoDbUsersDao } = await import('./MongoDbUsersDao.js');
        // productsDao = new MongoDbProductsDao();
        // cartsDao = new MongoDbCartsDao();
        // usersDao = new MongoDbUsersDao();
        break;
    default:
        const { default: MongoDbProductsDao } = await import('./MongoDbProductsDao.js')
        const { default: MongoDbCartsDao } = await import('./MongoDbCartsDao.js');
        const { default: MongoDbUsersDao } = await import('./MongoDbUsersDao.js');
        productsDao = new MongoDbProductsDao();
        cartsDao = new MongoDbCartsDao();
        usersDao = new MongoDbUsersDao();
        break;
}

export { productsDao, cartsDao, usersDao }