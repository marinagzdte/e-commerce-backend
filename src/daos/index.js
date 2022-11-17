let cartsDao;
let productsDao;
let usersDao;

switch (process.env.PERSISTENCE) {
    case 'mongodb':
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